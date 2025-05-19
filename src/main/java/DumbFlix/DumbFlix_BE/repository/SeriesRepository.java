package DumbFlix.DumbFlix_BE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import DumbFlix.DumbFlix_BE.entity.series.Season;
import DumbFlix.DumbFlix_BE.entity.series.Series;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
    @Query(value = "SELECT * FROM series ORDER BY id LIMIT :size OFFSET :offset", nativeQuery = true)
    List<Series> findSeriesWithPagination(@Param("size") int size, @Param("offset") int offset);

    Optional<Series> findBySeriesName(String seriesName);

    List<Series> findByCategories_CategoryId(Long categoryId);
}
