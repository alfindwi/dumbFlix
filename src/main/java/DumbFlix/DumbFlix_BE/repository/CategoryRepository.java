package DumbFlix.DumbFlix_BE.repository;

import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Categories, Long> {
    Optional<Categories> findByCategoryName(String categoryName);
}

