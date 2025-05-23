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
import com.fasterxml.jackson.core.type.TypeReference;

import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.MovieRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.service.CloudinaryService;
import DumbFlix.DumbFlix_BE.service.MovieService;

@Component
public class MovieQueueWorker {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private MovieService movieService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue() {
        String json = (String) redisTemplate.opsForList().leftPop("movie:queue");

        if (json == null) {
            return;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(json, new TypeReference<>() {
            });

            MovieRequest request = mapper.convertValue(map.get("request"), MovieRequest.class);

            String thumbnailBase64 = (String) map.get("thumbnail");
            String videoBase64 = (String) map.get("video");
            String posterBase64 = (String) map.get("poster");

            byte[] thumbnailBytes = Base64.getDecoder().decode(thumbnailBase64);
            byte[] videoBytes = Base64.getDecoder().decode(videoBase64);
            byte[] posterBytes = Base64.getDecoder().decode(posterBase64);

            MultipartFile thumbnailFile = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpeg",
                    thumbnailBytes);
            MultipartFile videoFile = new MockMultipartFile("video", "video.mp4", "video/mp4", videoBytes);
            MultipartFile postersFile = new MockMultipartFile("posters", "posters.jpg", "image/jpeg", posterBytes);

            CloudinaryResponse thumbnail = cloudinaryService.uploadThumbnail(thumbnailFile, "thumbnail");
            CloudinaryResponse video = cloudinaryService.uploadVideo(videoFile);
            CloudinaryResponse poster = cloudinaryService.uploadThumbnail(postersFile, "poster");

            movieService.createMovie(request, thumbnail.getUrl(), video.getUrl(), poster.getUrl());

        } catch (Exception e) {
            System.out.println("[Queue] Terjadi error saat memproses queue:");
            e.printStackTrace();
        }
    }

    @Scheduled(fixedDelay = 5000)
    public void processUpdateQueue() throws IOException {
        Object raw = redisTemplate.opsForList().leftPop("movie:update:queue");

        if (raw != null && raw instanceof Map<?, ?>) {
            Map<?, ?> map = (Map<?, ?>) raw;
            Long movieId = ((Number) map.get("movieId")).longValue();
            MovieRequest request = (MovieRequest) map.get("request");

            String thumbnailUrl = null;
            String videoUrl = null;
            String posterUrl = null;

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

            if (map.containsKey("poster")) {
                byte[] posterBytes = Base64.getDecoder().decode((String) map.get("poster"));
                MultipartFile posterFile = new MockMultipartFile("poster", posterBytes);
                CloudinaryResponse posterUpload = cloudinaryService.uploadThumbnail(posterFile, "poster");
                posterUrl = posterUpload.getUrl();
            }

            movieService.updateMovie(movieId, request, thumbnailUrl, videoUrl, posterUrl);

        }
    }

}
