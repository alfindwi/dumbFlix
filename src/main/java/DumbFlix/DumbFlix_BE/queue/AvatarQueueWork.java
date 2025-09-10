package DumbFlix.DumbFlix_BE.queue;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.AvatarRequest;
import DumbFlix.DumbFlix_BE.dto.request.MovieRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.service.AvatarService;
import DumbFlix.DumbFlix_BE.service.CloudinaryService;
import DumbFlix.DumbFlix_BE.service.MovieService;

@Component
public class AvatarQueueWork {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue() {
        String json = (String) redisTemplate.opsForList().leftPop("avatar:queue");

        if (json == null) {
            return;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(json, new TypeReference<>() {
            });

            AvatarRequest request = mapper.convertValue(map.get("request"), AvatarRequest.class);

            List<String> imageBase64 = mapper.convertValue(map.get("images"), new TypeReference<List<String>>() {});

            List<MultipartFile> imageFiles = imageBase64.stream().map(base64 -> {
                byte[] imageBytes = Base64.getDecoder().decode(base64);
                return new MockMultipartFile(
                        "images",
                        UUID.randomUUID() + ".jpg",
                        "images/jpeg",
                        imageBytes);
            }).map(MultipartFile.class::cast).toList();


            avatarService.createAvatar(request, imageFiles);

        } catch (Exception e) {
            System.out.println("[Queue] Terjadi error saat memproses queue:");
            e.printStackTrace();
        }
    }
}
