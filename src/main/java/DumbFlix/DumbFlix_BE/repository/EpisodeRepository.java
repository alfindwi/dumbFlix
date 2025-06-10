package DumbFlix.DumbFlix_BE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.series.Episode;
import DumbFlix.DumbFlix_BE.entity.series.Season;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    List<Episode> findBySeason_SeasonId(Long seasonId);

    Optional<Episode> findFirstByEpisodeName(String episodeName);

    Optional<Episode> findByEpisodeSlugAndSeason(String episodeSlug, Season season);

    List<Episode> findBySeason(Season season);

    Optional<Episode> findByEpisodeName(String episodeName);
}
