package DumbFlix.DumbFlix_BE.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DumbFlix.DumbFlix_BE.dto.request.CategoryRequest;
import DumbFlix.DumbFlix_BE.dto.response.CategoryResponse;
import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import DumbFlix.DumbFlix_BE.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategory() {
        List<CategoryResponse> categoryResponses = categoryService.getAllCategories().getBody();
        return ResponseEntity.ok(categoryResponses);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        Categories categories = new Categories();
        categories.setCategoryName(request.getCategoryName());

        CategoryResponse categoryResponse = categoryService.createCategory(categories);
        return ResponseEntity.ok(categoryResponse);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long categoryId,
            @RequestBody CategoryRequest request) {
        Categories categories = new Categories();
        categories.setCategoryName(request.getCategoryName());

        CategoryResponse categoryResponse = categoryService.updateCategory(categoryId, categories);
        return ResponseEntity.ok(categoryResponse);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

}
