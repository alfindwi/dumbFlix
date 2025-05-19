package DumbFlix.DumbFlix_BE.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.EpisodeRequest;
import DumbFlix.DumbFlix_BE.dto.response.EpisodeResponse;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.service.EpisodeService;

@RestController
@RequestMapping("/api/episode")
public class EpisodeController {

    private final EpisodeService episodeService;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public EpisodeController(EpisodeService episodeService) {
        this.episodeService = episodeService;
    }

    @GetMapping("/{episodeName}")
    public ResponseEntity<EpisodeResponse> getEpisodeByName(@PathVariable("episodeName") String episodeName) {
        EpisodeResponse episodeResponse = episodeService.getEpisodeByName(episodeName);
        return ResponseEntity.ok(episodeResponse);
    }

    @PostMapping
    public ResponseEntity<String> addEpisode(@ModelAttribute EpisodeRequest episodeRequest,
            @RequestParam("thumbnail") MultipartFile thumbnail, @RequestParam("video") MultipartFile video)
            throws IOException {

        try {
            String thumbnailBase64 = Base64.getEncoder().encodeToString(thumbnail.getBytes());
            String videoBase64 = Base64.getEncoder().encodeToString(video.getBytes());

            Map<String, Object> payload = new HashMap<>();
            payload.put("request", episodeRequest);
            payload.put("thumbnail", thumbnailBase64);
            payload.put("video", videoBase64);

            Long result = redisTemplate.opsForList().rightPush("episode:queue", payload);

            if (result != null) {
                return ResponseEntity.ok("File disimpan di Redis dan antrian berhasil dibuat.");
            } else {
                return ResponseEntity.status(500).body("Gagal menyimpan data ke Redis.");
            }
        } catch (Exception e) {
            throw new FuncErrorException("Failed to add episode: " + e.getMessage());
        }
    }

    @PutMapping("/{episodeId}")
    public ResponseEntity<String> updateEpisode(@PathVariable("episodeId") Long episodeId,
            @ModelAttribute EpisodeRequest episodeRequest,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
            @RequestParam(value = "video", required = false) MultipartFile video) throws IOException {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("episodeId", episodeId);
            payload.put("request", episodeRequest);

            if (thumbnail != null) {
                String thumbnailBase64 = Base64.getEncoder().encodeToString(thumbnail.getBytes());
                payload.put("thumbnail", thumbnailBase64);
            }

            if (video != null) {
                String videoBase64 = Base64.getEncoder().encodeToString(video.getBytes());
                payload.put("video", videoBase64);
            }

            Long result = redisTemplate.opsForList().rightPush("episode:update:queue", payload);

            if (result != null) {
                return ResponseEntity.ok("Permintaan update episode masuk antrian Redis.");
            } else {
                return ResponseEntity.status(500).body("Gagal menyimpan data update ke Redis.");
            }
        } catch (Exception e) {
            throw new FuncErrorException("Failed to update episode: " + e.getMessage());
        }
    }

    @DeleteMapping("/{episodeId}")
    public ResponseEntity<Map<String, String>> deleteEpisode(@PathVariable("episodeId") Long episodeId) {
        Map<String, String> response = episodeService.deleteEpisode(episodeId);
        return ResponseEntity.ok(response);
    }
}
