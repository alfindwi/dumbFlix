package DumbFlix.DumbFlix_BE.queue;

import java.io.IOException;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.SeriesRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.service.CloudinaryService;
import DumbFlix.DumbFlix_BE.service.SeriesService;


@Component
public class SeriesQueueWorker {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SeriesService seriesService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue() {

        String json = (String) redisTemplate.opsForList().leftPop("series:queue");

        if (json == null) {
            return;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(json, new TypeReference<>() {
            });

            SeriesRequest request = mapper.convertValue(map.get("request"), SeriesRequest.class);

            String posterBase64 = (String) map.get("poster");

            byte[] posterBytes = Base64.getDecoder().decode(posterBase64);

            MultipartFile postersFile = new MockMultipartFile("posters", "posters.jpg", "image/jpeg", posterBytes);

            CloudinaryResponse poster = cloudinaryService.uploadThumbnail(postersFile, "poster");

            seriesService.createSeries(request, poster.getUrl());

        } catch (Exception e) {
            System.out.println("[Queue] Terjadi error saat memproses queue:");
            e.printStackTrace();
        }
    }

    @Scheduled(fixedDelay = 5000)
    public void processUpdateQueue() throws IOException {
        String raw = (String) redisTemplate.opsForList().leftPop("series:update:queue");

        if (raw != null) {
            Map<String, Object> map = objectMapper.readValue(raw, new TypeReference<Map<String, Object>>() {
            });

            Long seriesId = map.containsKey("seriesId") ? Long.valueOf(map.get("seriesId").toString()) : null;
            if (seriesId == null) {
                throw new RuntimeException("seriesId tidak ditemukan di queue");
            }

            LinkedHashMap<String, Object> requestMap = objectMapper.convertValue(map.get("request"), new TypeReference<LinkedHashMap<String, Object>>() {});
            SeriesRequest request = objectMapper.convertValue(requestMap, SeriesRequest.class);

            String posterUrl = null;
            if (map.containsKey("poster")) {
                byte[] posterBytes = Base64.getDecoder().decode((String) map.get("poster"));
                MultipartFile posterFile = new MockMultipartFile("poster", posterBytes);
                CloudinaryResponse posterUpload = cloudinaryService.uploadThumbnail(posterFile, "poster");
                posterUrl = posterUpload.getUrl();
            }

            seriesService.updateSeries(seriesId, request, posterUrl);
        }
    }

}
