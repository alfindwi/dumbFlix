package DumbFlix.DumbFlix_BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.series.Season;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findBySeriesId(Long seriesId);
}
