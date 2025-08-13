package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.actors.Actors;

public interface ActorRepository extends JpaRepository<Actors, Long> {
    Optional<Actors> findBySlug(String slug);
    Optional<Actors> findByName(String name);
}
