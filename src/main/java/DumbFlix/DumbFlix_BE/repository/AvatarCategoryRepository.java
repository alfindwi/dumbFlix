package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.avatar.AvatarCategories;

public interface AvatarCategoryRepository extends JpaRepository<AvatarCategories, Long> {
    Optional<AvatarCategories> findByTitle(String title);
}

