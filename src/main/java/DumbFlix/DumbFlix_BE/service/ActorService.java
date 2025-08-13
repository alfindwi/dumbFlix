package DumbFlix.DumbFlix_BE.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.ActorsRequest;
import DumbFlix.DumbFlix_BE.dto.response.ActorResponse;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.entity.actors.Actors;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.ActorRepository;
import DumbFlix.DumbFlix_BE.security.util.SlugGenerator;

@Service
public class ActorService {

    private final ActorRepository actorRepository;
    private final CloudinaryService cloudinaryService;

    public ActorService(ActorRepository actorRepository, CloudinaryService cloudinaryService) {
        this.actorRepository = actorRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public ResponseEntity<List<ActorResponse>> getAllActors() {
        try {
            List<Actors> actors = actorRepository.findAll();
            List<ActorResponse> actorResponses = actors.stream()
                    .map(actor -> new ActorResponse(actor.getActorId(), actor.getName(), actor.getImage(),
                            actor.getSlug()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(actorResponses);
        } catch (Exception e) {
            throw new FuncErrorException("failed get all actor" + e.getMessage());
        }
    }

    public ResponseEntity<ActorResponse> getActorBySlug(String slug) {
        try {
            Actors actor = actorRepository.findBySlug(slug)
                    .orElseThrow(() -> new FuncErrorException("Actor not found"));

            return ResponseEntity
                    .ok(new ActorResponse(actor.getActorId(), actor.getName(), actor.getImage(), actor.getSlug()));
        } catch (Exception e) {
            throw new FuncErrorException("Failed to get actor by Slug: " + e.getMessage());
        }
    }

    public ActorResponse createActor(ActorsRequest actorsRequest, MultipartFile image) {
        try {
            if (actorsRequest == null || actorsRequest.getName() == null || actorsRequest.getName().trim().isEmpty()) {
                throw new FuncErrorException("Actor name is required");
            }

            if (actorRepository.findByName(actorsRequest.getName()).isPresent()) {
                throw new FuncErrorException("Actor already exists");
            }

            String timeStamp = String.valueOf(System.currentTimeMillis());
            CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(image, "Image_" + timeStamp);

            Actors actorEntity = new Actors();
            actorEntity.setName(actorsRequest.getName());
            actorEntity.setImage(cloudinaryResponse.getUrl());

            String slug = SlugGenerator.generateSlug(actorsRequest.getName());
            actorEntity.setSlug(slug);

            Actors savedActor = actorRepository.save(actorEntity);

            return new ActorResponse(savedActor.getActorId(), savedActor.getName(), savedActor.getImage(),
                    savedActor.getSlug());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to create actor: " + e.getMessage());
        }
    }

    public ActorResponse updateActor(Long actorId, ActorsRequest actorsRequest, MultipartFile image) {
        try {
            Actors actorExisting = actorRepository.findById(actorId)
                    .orElseThrow(() -> new FuncErrorException("Actor not found"));

            actorExisting.setName(actorsRequest.getName() != null ? actorsRequest.getName() : actorExisting.getName());

            if (image != null) {
                String timeStamp = String.valueOf(System.currentTimeMillis());
                CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(image, "Image_" + timeStamp);
                actorExisting.setImage(cloudinaryResponse.getUrl());
            }

            String slug = SlugGenerator.generateSlug(actorsRequest.getName());
            actorExisting.setSlug(slug);

            Actors savedActor = actorRepository.save(actorExisting);

            return new ActorResponse(savedActor.getActorId(), savedActor.getName(), savedActor.getImage(),
                    savedActor.getSlug());

        } catch (Exception e) {
            throw new FuncErrorException("Failed to update actor: " + e.getMessage());
        }
    }

    public Map<String, String> deleteActor(Long actorId) {
        try {
            actorRepository.deleteById(actorId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Actor deleted successfully");
            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete actor: " + e.getMessage());
        }
    }

}
