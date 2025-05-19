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
import DumbFlix.DumbFlix_BE.service.CloudinaryService;
import DumbFlix.DumbFlix_BE.service.EpisodeService;

@Component
public class EpisodeQueueWorker {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private EpisodeService epsidoeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue() throws IOException {
        Object raw = redisTemplate.opsForList().leftPop("episode:queue");

        if (raw != null && raw instanceof Map<?, ?> map) {
            EpisodeRequest request = (EpisodeRequest) map.get("request");
            String thumbnailBase64 = (String) map.get("thumbnail");
            String videoBase64 = (String) map.get("video");

            byte[] thumbnailBytes = Base64.getDecoder().decode(thumbnailBase64);
            byte[] videoBytes = Base64.getDecoder().decode(videoBase64);

            MultipartFile thumbnailFile = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpeg",
                    thumbnailBytes);
            MultipartFile videoFile = new MockMultipartFile("video", "video.mp4", "video/mp4", videoBytes);

            CloudinaryResponse thumbnail = cloudinaryService.uploadThumbnail(thumbnailFile, "thumbnail");
            CloudinaryResponse video = cloudinaryService.uploadVideo(videoFile);

            epsidoeService.addEpisode(request, thumbnail.getUrl(), video.getUrl());
        }
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

            epsidoeService.updateEpisode(episodeId, request, thumbnailUrl, videoUrl);

        }
    }

}
