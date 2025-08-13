package DumbFlix.DumbFlix_BE.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.DirectorRequest;
import DumbFlix.DumbFlix_BE.dto.response.DirectorResponse;
import DumbFlix.DumbFlix_BE.service.DirectorService;

@RestController
@RequestMapping("/api/director")
public class DirectorController {

    private final DirectorService directorService;

    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping
    public ResponseEntity<List<DirectorResponse>> getDirector() throws Exception {
        List<DirectorResponse> directorResponse = directorService.getAllDirectors().getBody();
        return ResponseEntity.ok(directorResponse);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DirectorResponse> getDirectorBySlug(@PathVariable("slug") String slug) throws Exception {
        DirectorResponse directorResponse = directorService.getDirectoryBySlug(slug).getBody();
        return ResponseEntity.ok(directorResponse);
    }

    @PostMapping
    public ResponseEntity<DirectorResponse> createDirector(@ModelAttribute DirectorRequest directorRequest,
            @RequestParam("image") MultipartFile image)
            throws Exception {
        DirectorResponse directorResponse = directorService.createDirector(directorRequest, image);
        return ResponseEntity.ok(directorResponse);
    }

    @PutMapping("/{directorId}")
    public ResponseEntity<String> updateDirector(@PathVariable("directorId") Long directorId,
            @ModelAttribute DirectorRequest directorRequest, @RequestParam("image") MultipartFile image)
            throws Exception {
        DirectorResponse directorResponse = directorService.updateDirector(directorId, directorRequest, image);
        return ResponseEntity.ok(directorResponse.getName());
    }

    @DeleteMapping("/{directorId}")
    public ResponseEntity<String> deleteDirector(@PathVariable("directorId") Long directorId) throws Exception {
        directorService.deleteDirector(directorId);
        return ResponseEntity.ok("Director deleted successfully");
    }
}
