package DumbFlix.DumbFlix_BE.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import DumbFlix.DumbFlix_BE.entity.movie.Movies;

@Repository
public interface MovieRepository extends JpaRepository<Movies, Long> {
    Optional<Movies> findByTitle(String title);

    @Query(value = "SELECT * FROM movies ORDER BY movie_id LIMIT :size OFFSET :offset", nativeQuery = true)
    List<Movies> findMoviesWithPagination(@Param("size") int size, @Param("offset") int offset);

    List<Movies> findByCategories_CategoryId(Long categoryId);

    Optional<Movies> findBySlug(String slug);

    @SuppressWarnings("null")
    @EntityGraph(attributePaths = { "categories" })
    List<Movies> findAll();
}
