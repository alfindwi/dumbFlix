package DumbFlix.DumbFlix_BE.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.response.CategoryResponse;
import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Categories> categories = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = categories.stream()
                .map(category -> new CategoryResponse(category.getCategoryId(), category.getCategoryName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryResponses);
    }

    public CategoryResponse createCategory(Categories categories) {
        if (categories == null || categories.getCategoryName() == null || categories.getCategoryName().trim().isEmpty()) {
            throw new FuncErrorException("Category name is required");
        }

        System.out.println("📌 Kategori: " + categories.getCategoryName());
    
        // Cek apakah kategori sudah ada
        if (categoryRepository.findByCategoryName(categories.getCategoryName()).isPresent()) {
            throw new FuncErrorException("Category already exists");
        }
    
        Categories savedCategory = categoryRepository.save(categories);
    
        return new CategoryResponse(savedCategory.getCategoryId(), savedCategory.getCategoryName());
    }
    
}
