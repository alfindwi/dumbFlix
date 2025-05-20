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
        String decodedEpisodeName = episodeName.replace("-", " ");

        EpisodeResponse episodeResponse = episodeService.getEpisodeByName(decodedEpisodeName);
        return ResponseEntity.ok(episodeResponse);
    }

    @GetMapping("/{seriesName}/season-{seasonNumber}/episode-{episodeName}")
    public ResponseEntity<EpisodeResponse> getSeriesAndSeasonAndEpisode(
            @PathVariable String seriesName,
            @PathVariable Integer seasonNumber,
            @PathVariable String episodeName) {
        String decodedSeriesName = seriesName.replace("-", " ");
        String decodedEpisodeName = episodeName.replace("-", " ");

        EpisodeResponse episodeResponse = episodeService.getSeriesAndSeasonAndEpisode(
                decodedSeriesName, seasonNumber, decodedEpisodeName);
        return ResponseEntity.ok(episodeResponse);
    }

    @PostMapping("/{seriesName}")
    public ResponseEntity<String> addEpisode(
            @PathVariable("seriesName") String seriesName,
            @ModelAttribute EpisodeRequest episodeRequest,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @RequestParam("video") MultipartFile video) {

        try {
            String decodedSeriesName = seriesName.replace("-", " ");

            if (episodeRequest == null) {
                return ResponseEntity.badRequest().body("Episode request cannot be null.");
            }
            if (thumbnail.isEmpty() || video.isEmpty()) {
                return ResponseEntity.badRequest().body("Thumbnail and video files are required.");
            }

            if (episodeRequest.getSeasonNumber() <= 0) {
                return ResponseEntity.badRequest().body("Invalid season number.");
            }

            String thumbnailBase64 = Base64.getEncoder().encodeToString(thumbnail.getBytes());
            String videoBase64 = Base64.getEncoder().encodeToString(video.getBytes());

            Map<String, Object> payload = new HashMap<>();
            payload.put("seriesName", decodedSeriesName);
            payload.put("seasonNumber", episodeRequest.getSeasonNumber());
            payload.put("episodeName", episodeRequest.getEpisodeName());
            payload.put("episodeNumber", episodeRequest.getEpisodeNumber());
            payload.put("episodeDescription", episodeRequest.getEpisodeDescription());
            payload.put("thumbnail", thumbnailBase64);
            payload.put("video", videoBase64);

            Long result = redisTemplate.opsForList().rightPush("episode:queue", payload);

            if (result == null) {
                return ResponseEntity.status(500).body("Failed to save data to Redis queue.");
            }

            return ResponseEntity.ok("Episode added to Redis queue successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to process files: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add episode: " + e.getMessage());
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
