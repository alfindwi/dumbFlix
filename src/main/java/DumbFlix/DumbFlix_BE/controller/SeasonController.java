package DumbFlix.DumbFlix_BE.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DumbFlix.DumbFlix_BE.dto.request.SeasonRequest;
import DumbFlix.DumbFlix_BE.dto.response.SeasonResponse;
import DumbFlix.DumbFlix_BE.service.SeasonService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/season")
public class SeasonController {

    private final SeasonService seasonService;

    public SeasonController(SeasonService seasonService) {
        this.seasonService = seasonService;
    }

    @GetMapping("/{seriesId}")
    public ResponseEntity<List<SeasonResponse>> getSeasonBySeriesId(@PathVariable("seriesId") Long seriesId) {
        List<SeasonResponse> seasons = seasonService.getSeasonBySeriesId(seriesId);
        return ResponseEntity.ok(seasons);
    }

    @PostMapping("/{seriesId}")
    public ResponseEntity<SeasonResponse> createSeason(
            @PathVariable Long seriesId,
            @RequestBody @Valid SeasonRequest seasonRequest) {

        SeasonResponse season = seasonService.addSeason(seriesId, seasonRequest);
        return ResponseEntity.ok(season);
    }

    @DeleteMapping("/{seasonId}")
    public ResponseEntity<Map<String, String>> deleteSeason(@PathVariable("seasonId") Long seasonId) {
        Map<String, String> response = seasonService.deleteSeason(seasonId);
        return ResponseEntity.ok(response);
    }

}
