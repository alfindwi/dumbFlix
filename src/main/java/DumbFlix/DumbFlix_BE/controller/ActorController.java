package DumbFlix.DumbFlix_BE.controller;

import java.util.List;
import java.util.Map;

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

import DumbFlix.DumbFlix_BE.dto.request.ActorsRequest;
import DumbFlix.DumbFlix_BE.dto.response.ActorResponse;
import DumbFlix.DumbFlix_BE.service.ActorService;

@RestController
@RequestMapping("/api/actor")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping
    public ResponseEntity<List<ActorResponse>> getActor() {
        List<ActorResponse> actorResponses = actorService.getAllActors().getBody();
        return ResponseEntity.ok(actorResponses);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ActorResponse> getActorBySlug(@PathVariable("slug") String slug) {
        ActorResponse actorResponse = actorService.getActorBySlug(slug).getBody();
        return ResponseEntity.ok(actorResponse);
    }

    @PostMapping
    public ResponseEntity<ActorResponse> createActor(
            @RequestParam("image") MultipartFile image,
            @ModelAttribute ActorsRequest actorsRequest) throws Exception {

        ActorResponse actorResponse = actorService.createActor(actorsRequest, image);
        return ResponseEntity.ok(actorResponse);
    }

    @PutMapping("/{actorId}")
    public ResponseEntity<ActorResponse> updateActor(@PathVariable("actorId") Long actorId, ActorsRequest actorsRequest,
            MultipartFile image)
            throws Exception {
        ActorResponse actorResponse = actorService.updateActor(actorId, actorsRequest, image);
        return ResponseEntity.ok(actorResponse);
    }

    @DeleteMapping("/{actorId}")
    public ResponseEntity<Map<String, String>> deleteActor(@PathVariable("actorId") Long actorId) {
        Map<String, String> response = actorService.deleteActor(actorId);
        return ResponseEntity.ok(response);
    }
}
