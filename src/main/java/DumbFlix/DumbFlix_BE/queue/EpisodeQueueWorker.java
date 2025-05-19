package DumbFlix.DumbFlix_BE.queue;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.EpisodeRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.SeasonRepository;
import DumbFlix.DumbFlix_BE.repository.SeriesRepository;
import DumbFlix.DumbFlix_BE.service.CloudinaryService;
import DumbFlix.DumbFlix_BE.service.EpisodeService;

@Component
public class EpisodeQueueWorker {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private EpisodeService episodeService;

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue() {
        try {
            Object raw = redisTemplate.opsForList().leftPop("episode:queue");

            if (raw != null && raw instanceof Map<?, ?> map) {
                String seriesName = (String) map.get("seriesName");
                Long seasonNumber = parseLong(map.get("seasonNumber"));
                String episodeName = (String) map.get("episodeName");
                int episodeNumber = parseInt(map.get("episodeNumber"));
                String episodeDescription = (String) map.get("episodeDescription");
                String thumbnailBase64 = (String) map.get("thumbnail");
                String videoBase64 = (String) map.get("video");

                if (seriesName == null || seasonNumber == null) {
                    System.err.println("Series name or Season number is missing in queue data.");
                    return;
                }

                Series series = seriesRepository.findBySeriesName(seriesName)
                        .orElseThrow(() -> new FuncErrorException("Series not found"));

                Season season = seasonRepository
                        .findBySeriesAndSeasonNumber(series, seasonNumber != null ? seasonNumber.intValue() : null)
                        .orElseThrow(() -> new FuncErrorException("Season not found"));

                if (thumbnailBase64 != null && videoBase64 != null) {
                    byte[] thumbnailBytes = Base64.getDecoder().decode(thumbnailBase64);
                    byte[] videoBytes = Base64.getDecoder().decode(videoBase64);

                    MultipartFile thumbnailFile = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpeg",
                            thumbnailBytes);
                    MultipartFile videoFile = new MockMultipartFile("video", "video.mp4", "video/mp4", videoBytes);

                    CloudinaryResponse thumbnail = cloudinaryService.uploadThumbnail(thumbnailFile, "thumbnail");
                    CloudinaryResponse video = cloudinaryService.uploadVideo(videoFile);

                    EpisodeRequest episodeRequest = new EpisodeRequest();
                    episodeRequest.setSeasonNumber(season.getSeasonNumber());
                    episodeRequest.setEpisodeName(episodeName);
                    episodeRequest.setEpisodeNumber(episodeNumber);
                    episodeRequest.setEpisodeDescription(episodeDescription);

                    episodeService.addEpisode(seriesName, episodeRequest, thumbnail.getUrl(), video.getUrl());

                    System.out.println("Episode added successfully");
                } else {
                    System.err.println("Invalid thumbnail or video data in queue.");
                }
            }
        } catch (Exception e) {
            System.err.println("Error processing queue: " + e.getMessage());
        }
    }

    private Long parseLong(Object obj) {
        if (obj instanceof Integer) {
            return ((Integer) obj).longValue();
        } else if (obj instanceof Long) {
            return (Long) obj;
        } else if (obj instanceof String) {
            try {
                return Long.parseLong((String) obj);
            } catch (NumberFormatException e) {
                System.err.println("Invalid seasonNumber format: " + obj);
            }
        }
        return null;
    }

    private int parseInt(Object obj) {
        if (obj instanceof Integer) {
            return (Integer) obj;
        } else if (obj instanceof String) {
            try {
                return Integer.parseInt((String) obj);
            } catch (NumberFormatException e) {
                System.err.println("Invalid episodeNumber format: " + obj);
            }
        }
        return 0;
    }

    @Scheduled(fixedDelay = 5000)
    public void processUpdateQueue() throws IOException {
        Object raw = redisTemplate.opsForList().leftPop("episode:update:queue");

        if (raw != null && raw instanceof Map<?, ?>) {
            Map<?, ?> map = (Map<?, ?>) raw;
            Long episodeId = ((Number) map.get("episodeId")).longValue();
            EpisodeRequest request = (EpisodeRequest) map.get("request");

            String thumbnailUrl = null;
            String videoUrl = null;

            if (map.containsKey("thumbnail")) {
                byte[] thumbnailBytes = Base64.getDecoder().decode((String) map.get("thumbnail"));
                MultipartFile thumbnailFile = new MockMultipartFile("thumbnail", thumbnailBytes);
                CloudinaryResponse thumbnailUpload = cloudinaryService.uploadThumbnail(thumbnailFile, "thumbnail");
                thumbnailUrl = thumbnailUpload.getUrl();
            }

            if (map.containsKey("video")) {
                byte[] videoBytes = Base64.getDecoder().decode((String) map.get("video"));
                MultipartFile videoFile = new MockMultipartFile("video", videoBytes);
                CloudinaryResponse videoUpload = cloudinaryService.uploadVideo(videoFile);
                videoUrl = videoUpload.getUrl();
            }

            episodeService.updateEpisode(episodeId, request, thumbnailUrl, videoUrl);

        }
    }

}
