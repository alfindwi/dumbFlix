package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.categories.Categories;

public interface CategoryRepository extends JpaRepository<Categories, Long> {
    Optional<Categories> findByCategoryName(String categoryName);
}

