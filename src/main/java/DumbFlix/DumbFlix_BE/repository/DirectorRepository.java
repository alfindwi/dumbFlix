package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.directors.Directors;

public interface DirectorRepository extends JpaRepository<Directors, Long> {
    Optional<Directors> findByName(String name);
    Optional<Directors> findBySlug(String slug);
}
