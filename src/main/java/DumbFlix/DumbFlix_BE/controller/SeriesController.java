package DumbFlix.DumbFlix_BE.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.SeriesRequest;
import DumbFlix.DumbFlix_BE.dto.response.SeriesResponse;
import DumbFlix.DumbFlix_BE.service.SeriesService;

@RestController
@RequestMapping("/api/series")
public class SeriesController {

    private final SeriesService seriesService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public SeriesController(SeriesService seriesService) {
        this.seriesService = seriesService;
    }

    @GetMapping
    public ResponseEntity<List<SeriesResponse>> getAllSeries() {
        List<SeriesResponse> seriesResponses = seriesService.getAllSeries();
        return ResponseEntity.ok(seriesResponses);
    }

    @GetMapping("/{seriesSlug}")
    public ResponseEntity<SeriesResponse> getSeriesByName(@PathVariable("seriesSlug") String seriesSlug) {
        SeriesResponse seriesResponse = seriesService.getSeriesByName(seriesSlug);
        return ResponseEntity.ok(seriesResponse);
    }

    @PostMapping
    public ResponseEntity<String> createSeries(
            @ModelAttribute SeriesRequest seriesRequest,
            @RequestPart("poster") MultipartFile poster) throws IOException {

        String posterBase64 = Base64.getEncoder().encodeToString(poster.getBytes());

        Map<String, Object> payload = new HashMap<>();
        payload.put("request", seriesRequest);
        payload.put("poster", posterBase64);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(payload);

        Long result = redisTemplate.opsForList().rightPush("series:queue", json);

        if (result != null) {
            return ResponseEntity.ok("File disimpan di Redis dan antrian berhasil dibuat.");
        } else {
            return ResponseEntity.status(500).body("Gagal menyimpan data ke Redis.");
        }
    }

    @PutMapping("/{seriesId}")
    public ResponseEntity<String> updateSeries(
            @PathVariable("seriesId") Long seriesId,
            @ModelAttribute SeriesRequest seriesRequest,
            @RequestParam(value = "poster", required = false) MultipartFile poster) throws IOException {

        Map<String, Object> payload = new HashMap<>();
        payload.put("seriesId", seriesId); 
        payload.put("request", seriesRequest);
        if (poster != null) {
            String posterBase64 = Base64.getEncoder().encodeToString(poster.getBytes());
            payload.put("poster", posterBase64);
        }

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(payload);

        Long result = redisTemplate.opsForList().rightPush("series:update:queue", json);
        if (result != null) {
            return ResponseEntity.ok("File disimpan di Redis dan antrian berhasil dibuat.");
        } else {
            return ResponseEntity.status(500).body("Gagal menyimpan data ke Redis.");
        }
    }

    @DeleteMapping("/{seriesId}")
    public ResponseEntity<Map<String, String>> deleteSeries(@PathVariable("seriesId") Long seriesId) {
        Map<String, String> response = seriesService.deleteSeries(seriesId);
        return ResponseEntity.ok(response);
    }

}
