package DumbFlix.DumbFlix_BE.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DumbFlix.DumbFlix_BE.dto.response.SearchResultResponse;
import DumbFlix.DumbFlix_BE.service.SearchService;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/{keyword}")
    public ResponseEntity<List<SearchResultResponse>> searchAll(@PathVariable("keyword") String keyword) {
        return ResponseEntity.ok(searchService.searchAll(keyword));
    }

}
