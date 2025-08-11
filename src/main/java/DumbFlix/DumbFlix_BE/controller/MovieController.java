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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import DumbFlix.DumbFlix_BE.dto.request.MovieRequest;
import DumbFlix.DumbFlix_BE.dto.response.MovieResponse;
import DumbFlix.DumbFlix_BE.service.MovieService;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<MovieResponse>> getAllMovies() {
        List<MovieResponse> movieResponses = movieService.getAllMovies();
        return ResponseEntity.ok(movieResponses);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<MovieResponse>> getMoviesByCategory(@PathVariable("categoryId") Long categoryId) {
        List<MovieResponse> movieResponses = movieService.getMoviesByCategory(categoryId);
        return ResponseEntity.ok(movieResponses);
    }

    @GetMapping("/{title}")
    public ResponseEntity<MovieResponse> getMovieByName(@PathVariable("title") String title) {
        MovieResponse movieResponse = movieService.getMovieByName(title);
        return ResponseEntity.ok(movieResponse);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<MovieResponse> getMovieBySlug(@PathVariable("slug") String slug) {
        MovieResponse movieResponse = movieService.getMovieBySlug(slug);
        return ResponseEntity.ok(movieResponse);
    }

   

    @PostMapping
    public ResponseEntity<String> createMovie(
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @RequestParam("video") MultipartFile video,
            @RequestParam("poster") MultipartFile poster,
            @ModelAttribute MovieRequest request) throws IOException {

        String thumbnailBase64 = Base64.getEncoder().encodeToString(thumbnail.getBytes());
        String videoBase64 = Base64.getEncoder().encodeToString(video.getBytes());
        String posterBase64 = Base64.getEncoder().encodeToString(poster.getBytes());

        Map<String, Object> payload = new HashMap<>();
        payload.put("request", request);
        payload.put("thumbnail", thumbnailBase64);
        payload.put("poster", posterBase64);
        payload.put("video", videoBase64);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(payload);

        Long result = redisTemplate.opsForList().rightPush("movie:queue", json);

        if (result != null) {
            return ResponseEntity.ok("File disimpan di Redis dan antrian berhasil dibuat.");
        } else {
            return ResponseEntity.status(500).body("Gagal menyimpan data ke Redis.");
        }
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<String> updateMovie(
            @PathVariable Long movieId,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam(value = "poster", required = false) MultipartFile poster,
            @ModelAttribute MovieRequest request) throws IOException {

        Map<String, Object> payload = new HashMap<>();
        payload.put("movieId", movieId);
        payload.put("request", request);

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String base64 = Base64.getEncoder().encodeToString(thumbnail.getBytes());
            payload.put("thumbnail", base64);
        }

        if (video != null && !video.isEmpty()) {
            String base64 = Base64.getEncoder().encodeToString(video.getBytes());
            payload.put("video", base64);
        }

        if (poster != null && !poster.isEmpty()) {
            String base64 = Base64.getEncoder().encodeToString(poster.getBytes());
            payload.put("poster", base64);
        }

        Long result = redisTemplate.opsForList().rightPush("movie:update:queue", payload);
        if (result != null) {
            return ResponseEntity.ok("Permintaan update movie masuk antrian Redis.");
        } else {
            return ResponseEntity.status(500).body("Gagal menyimpan data update ke Redis.");
        }
    }

    @DeleteMapping("/{moviesId}")
    public ResponseEntity<Map<String, String>> deleteMovies(@PathVariable("moviesId") Long moviesId) {
        Map<String, String> response = movieService.deleteMovies(moviesId);
        return ResponseEntity.ok(response);
    }
}
