package DumbFlix.DumbFlix_BE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.entity.series.Series;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findBySeriesId(Long seriesId);

    List<Season> findBySeries_SeriesName(String seriesName);

    Optional<Season> findBySeasonNumberAndSeries(Integer seasonNumber, Series series);

    Optional<Season> findBySeriesAndSeasonNumber(Series series, Integer seasonNumber);

    boolean existsBySeriesAndSeasonNumber(Series series, int seasonNumber);

}
