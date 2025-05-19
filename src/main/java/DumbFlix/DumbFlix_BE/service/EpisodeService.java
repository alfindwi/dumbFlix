package DumbFlix.DumbFlix_BE.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.EpisodeRequest;
import DumbFlix.DumbFlix_BE.dto.response.EpisodeResponse;
import DumbFlix.DumbFlix_BE.entity.series.Episode;
import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.EpisodeRepository;
import DumbFlix.DumbFlix_BE.repository.SeasonRepository;

@Service
public class EpisodeService {

    private final EpisodeRepository episodeRepository;
    private final SeasonRepository seasonRepository;

    public EpisodeService(EpisodeRepository episodeRepository, SeasonRepository seasonRepository) {
        this.episodeRepository = episodeRepository;
        this.seasonRepository = seasonRepository;
    }

    public EpisodeResponse getEpisodeByName(String episodeName) {
        Episode episode = episodeRepository.findByEpisodeName(episodeName)
                .orElseThrow(() -> new FuncErrorException("Episode not found"));

        return new EpisodeResponse(episode.getId(), episode.getEpisodeName(), episode.getEpisodeNumber(),
                episode.getEpisodeDescription(), episode.getEpisodeImage(), episode.getEpisodeVideo());
    }

    public EpisodeResponse addEpisode(EpisodeRequest episodeRequest, String thumbnail, String video) {
        try {

            Season season = seasonRepository.findById(episodeRequest.getSeasonId())
                    .orElseThrow(() -> new FuncErrorException("Season not found"));

            Episode savedEpisode = new Episode();
            savedEpisode.setEpisodeName(episodeRequest.getEpisodeName());
            savedEpisode.setEpisodeNumber(episodeRequest.getEpisodeNumber());
            savedEpisode.setEpisodeDescription(episodeRequest.getEpisodeDescription());
            savedEpisode.setEpisodeImage(thumbnail);
            savedEpisode.setEpisodeVideo(video);
            savedEpisode.setSeason(season);

            Episode saved = episodeRepository.save(savedEpisode);

            return new EpisodeResponse(saved.getId(), saved.getEpisodeName(), saved.getEpisodeNumber(),
                    saved.getEpisodeDescription(), saved.getEpisodeImage(), saved.getEpisodeVideo());
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
                    episodeRequest.getEpisodeDescription() != null ? episodeRequest.getEpisodeDescription()
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
