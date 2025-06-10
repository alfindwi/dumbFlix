package DumbFlix.DumbFlix_BE.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.SeasonRequest;
import DumbFlix.DumbFlix_BE.dto.response.EpisodeResponse;
import DumbFlix.DumbFlix_BE.dto.response.SeasonResponse;
import DumbFlix.DumbFlix_BE.entity.series.Episode;
import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.SeasonRepository;
import DumbFlix.DumbFlix_BE.repository.SeriesRepository;

@Service
public class SeasonService {

    private final SeasonRepository seasonRepository;
    private final SeriesRepository seriesRepository;

    public SeasonService(SeasonRepository seasonRepository, SeriesRepository seriesRepository) {
        this.seasonRepository = seasonRepository;
        this.seriesRepository = seriesRepository;
    }

    public SeasonResponse addSeason(String seriesName, SeasonRequest seasonRequest) {
        try {
            Series series = seriesRepository.findBySeriesName(seriesName)
                    .orElseThrow(() -> new FuncErrorException("Series not found"));

            int requesSeasonNumber = seasonRequest.getSeasonNumber();

            boolean seasonExist = seasonRepository.existsBySeriesAndSeasonNumber(series, requesSeasonNumber);
            if (seasonExist) {
                throw new FuncErrorException("Season " + requesSeasonNumber + " already exist");
            }

            Season season = new Season();
            season.setSeries(series);
            season.setSeasonNumber(seasonRequest.getSeasonNumber());

            Season savedSeason = seasonRepository.save(season);

            return new SeasonResponse(
                    savedSeason.getSeasonId(),
                    savedSeason.getSeasonNumber(),
                    new ArrayList<>());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to add season: " + e.getMessage());
        }
    }

    @Cacheable(value = "seasonBySeriesName", key = "'seasonBySeriesName' + #seriesName")
    public List<SeasonResponse> getSeasonBySeriesName(String seriesName) {
        try {
            List<Season> seasons = seasonRepository.findBySeries_SeriesName(seriesName);

            return seasons.stream().map(season -> {
                List<EpisodeResponse> episodeResponses = season.getEpisodes().stream()
                        .sorted(Comparator.comparing(Episode::getEpisodeNumber))
                        .map(episode -> new EpisodeResponse(
                                episode.getId(),
                                episode.getEpisodeName(),
                                episode.getEpisodeNumber(),
                                episode.getEpisodeDescription(),
                                episode.getEpisodeImage(),
                                episode.getEpisodeVideo(), episode.getSlug()))
                        .collect(Collectors.toList());

                return new SeasonResponse(
                        season.getSeasonId(),
                        season.getSeasonNumber(),
                        episodeResponses);
            }).collect(Collectors.toList());

        } catch (Exception e) {
            throw new FuncErrorException("Failed to get seasons: " + e.getMessage());
        }
    }

    public Map<String, String> deleteSeason(Long seasonId) {
        try {
            Optional<Season> season = seasonRepository.findById(seasonId);

            if (season.isEmpty()) {
                throw new FuncErrorException("Season not found");
            }

            seasonRepository.delete(season.get());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Season deleted successfully");

            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete season: " + e.getMessage());
        }
    }

}
