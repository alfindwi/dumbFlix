package DumbFlix.DumbFlix_BE.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.AvatarRequest;
import DumbFlix.DumbFlix_BE.dto.response.AvatarResponse;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.service.AvatarService;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

    private final AvatarService avatarService;

    private final RedisTemplate<String, Object> redisTemplate;

    public AvatarController(AvatarService avatarService, RedisTemplate<String, Object> redisTemplate) {
        this.avatarService = avatarService;
        this.redisTemplate = redisTemplate;
    }

    @GetMapping
    public ResponseEntity<List<AvatarResponse>> getAllAvatar() throws Exception {
        List<AvatarResponse> avatarResponses = avatarService.getAllAvatar();
        return ResponseEntity.ok(avatarResponses);
    }

    @PostMapping
    public Map<String, Object> createAvatar(
            @ModelAttribute AvatarRequest avatarRequest,
            @RequestParam("image") List<MultipartFile> images) throws IOException {
        try {
            List<String> base64List = images.stream()
                    .map(file -> {
                        try {
                            return Base64.getEncoder().encodeToString(file.getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException("Gagal encode file: " + file.getOriginalFilename(), e);
                        }
                    })
                    .toList();

            Map<String, Object> payload = new HashMap<>();
            payload.put("request", avatarRequest);
            payload.put("images", base64List);

            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(payload);

            redisTemplate.opsForList().rightPush("avatar:queue", json);

            return Map.of("message", "File disimpan di Redis dan antrian berhasil dibuat.");
        } catch (Exception e) {
            throw new FuncErrorException("Failed to create avatar: " + e.getMessage());
        }
    }

    @PutMapping("/{avatarId}")
    public Map<String, Object> updateAvatar(@PathVariable Long avatarId, @ModelAttribute AvatarRequest avatarRequest,
            @RequestPart(value = "image", required = false) List<MultipartFile> image) throws IOException {
        try {
            AvatarResponse response = avatarService.updateAvatar(avatarId, avatarRequest, image);
            return Map.of(
                    "title", response.getTitle(),
                    "images", response.getImage());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to update avatar: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvatar(@PathVariable Long id) {
        avatarService.deleteAvatar(id);
        return ResponseEntity.noContent().build();
    }

}
