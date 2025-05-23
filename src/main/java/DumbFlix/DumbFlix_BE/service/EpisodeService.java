package DumbFlix.DumbFlix_BE.service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.EpisodeRequest;
import DumbFlix.DumbFlix_BE.dto.response.EpisodeResponse;
import DumbFlix.DumbFlix_BE.entity.series.Episode;
import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.EpisodeRepository;
import DumbFlix.DumbFlix_BE.repository.SeasonRepository;
import DumbFlix.DumbFlix_BE.repository.SeriesRepository;

@Service
public class EpisodeService {

        @Autowired
        private EpisodeRepository episodeRepository;

        @Autowired
        private SeasonRepository seasonRepository;

        @Autowired
        private SeriesRepository seriesRepository;

        public EpisodeResponse getEpisodeByName(String episodeName) {
                Episode episode = episodeRepository.findFirstByEpisodeName(episodeName)
                                .orElseThrow(() -> new FuncErrorException("Episode not found"));

                return new EpisodeResponse(
                                episode.getId(),
                                episode.getEpisodeName(),
                                episode.getEpisodeNumber(),
                                episode.getEpisodeDescription(),
                                episode.getEpisodeImage(),
                                episode.getEpisodeVideo());
        }

        public EpisodeResponse getSeriesAndSeasonAndEpisode(String seriesName, Integer seasonNumber,
                        String episodeName) {

                Series series = seriesRepository.findBySeriesName(seriesName)
                                .orElseThrow(() -> new FuncErrorException("Series not found"));

                Season season = seasonRepository.findBySeasonNumberAndSeries(seasonNumber, series)
                                .orElseThrow(() -> new FuncErrorException("Season not found for this series"));

                List<Episode> sortedEpisodes = season.getEpisodes().stream()
                                .sorted(Comparator.comparingInt(Episode::getEpisodeNumber))
                                .collect(Collectors.toList());

                Episode episode = sortedEpisodes.stream()
                                .filter(e -> e.getEpisodeName().equalsIgnoreCase(episodeName))
                                .findFirst()
                                .orElseThrow(() -> new FuncErrorException("Episode not found in this season"));

                return new EpisodeResponse(
                                episode.getId(),
                                episode.getEpisodeName(),
                                episode.getEpisodeNumber(),
                                episode.getEpisodeDescription(),
                                episode.getEpisodeImage(),
                                episode.getEpisodeVideo());
        }

        public List<EpisodeResponse> getEpisodeBySeason(String seriesName, Integer seasonNumber) {

                Series series = seriesRepository.findBySeriesName(seriesName)
                                .orElseThrow(() -> new FuncErrorException("Series not found"));

                Season season = seasonRepository.findBySeasonNumberAndSeries(seasonNumber, series)
                                .orElseThrow(() -> new FuncErrorException("Season not found"));

                List<Episode> episodes = episodeRepository.findBySeason(season);

                return episodes.stream().sorted(Comparator.comparingInt(Episode::getEpisodeNumber))
                                .map(e -> new EpisodeResponse(
                                                e.getId(),
                                                e.getEpisodeName(),
                                                e.getEpisodeNumber(),
                                                e.getEpisodeDescription(),
                                                e.getEpisodeImage(),
                                                e.getEpisodeVideo()))
                                .collect(Collectors.toList());
        }

        public EpisodeResponse addEpisode(String seriesName, EpisodeRequest episodeRequest, String thumbnail,
                        String video) {
                try {
                        Series series = seriesRepository.findBySeriesName(seriesName)
                                        .orElseThrow(() -> new FuncErrorException("Series not found"));

                        Season season = seasonRepository
                                        .findBySeriesAndSeasonNumber(series, episodeRequest.getSeasonNumber())
                                        .orElseThrow(() -> new FuncErrorException("Season not found"));

                        Episode episode = new Episode();
                        episode.setEpisodeName(episodeRequest.getEpisodeName());
                        episode.setEpisodeNumber(episodeRequest.getEpisodeNumber());
                        episode.setEpisodeDescription(episodeRequest.getEpisodeDescription());
                        episode.setEpisodeImage(thumbnail);
                        episode.setEpisodeVideo(video);
                        episode.setSeason(season);

                        Episode saved = episodeRepository.save(episode);

                        return new EpisodeResponse(saved.getId(), saved.getEpisodeName(), saved.getEpisodeNumber(),
                                        saved.getEpisodeDescription(), saved.getEpisodeImage(),
                                        saved.getEpisodeVideo());
                } catch (Exception e) {
                        throw new FuncErrorException("Failed to add episode: " + e.getMessage());
                }
        }

        public EpisodeResponse updateEpisode(Long episodeId, EpisodeRequest episodeRequest, String thumbnailUrl,
                        String videoUrl) {
                try {
                        if (episodeId == null) {
                                throw new FuncErrorException("Episode ID is required");
                        }

                        Episode existingEpisode = episodeRepository.findById(episodeId)
                                        .orElseThrow(() -> new FuncErrorException("Episode not found"));

                        existingEpisode.setEpisodeName(
                                        episodeRequest.getEpisodeName() != null ? episodeRequest.getEpisodeName()
                                                        : existingEpisode.getEpisodeName());

                        existingEpisode.setEpisodeNumber(
                                        episodeRequest.getEpisodeNumber() != null ? episodeRequest.getEpisodeNumber()
                                                        : existingEpisode.getEpisodeNumber());

                        existingEpisode.setEpisodeDescription(
                                        episodeRequest.getEpisodeDescription() != null
                                                        ? episodeRequest.getEpisodeDescription()
                                                        : existingEpisode.getEpisodeDescription());

                        if (thumbnailUrl != null) {
                                existingEpisode.setEpisodeImage(thumbnailUrl);
                        }

                        if (videoUrl != null) {
                                existingEpisode.setEpisodeVideo(videoUrl);
                        }

                        Episode updated = episodeRepository.save(existingEpisode);

                        return new EpisodeResponse(
                                        updated.getId(),
                                        updated.getEpisodeName(),
                                        updated.getEpisodeNumber(),
                                        updated.getEpisodeDescription(),
                                        updated.getEpisodeImage(),
                                        updated.getEpisodeVideo());
                } catch (Exception e) {
                        throw new FuncErrorException("Failed to update episode: " + e.getMessage());
                }
        }

        public Map<String, String> deleteEpisode(Long episodeId) {
                try {
                        Optional<Episode> episode = episodeRepository.findById(episodeId);

                        if (episode.isEmpty()) {
                                throw new FuncErrorException("Episode not found");
                        }

                        episodeRepository.deleteById(episodeId);

                        Map<String, String> response = new HashMap<>();
                        response.put("message", "Episode deleted successfully");

                        return response;
                } catch (Exception e) {
                        throw new FuncErrorException("Failed to delete episode: " + e.getMessage());
                }
        }
}
