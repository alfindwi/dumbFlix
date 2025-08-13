package DumbFlix.DumbFlix_BE.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.DirectorRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.dto.response.DirectorResponse;
import DumbFlix.DumbFlix_BE.entity.directors.Directors;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.DirectorRepository;
import DumbFlix.DumbFlix_BE.security.util.SlugGenerator;

@Service
public class DirectorService {

    private final DirectorRepository directorRepository;
    private final CloudinaryService cloudinaryService;

    public DirectorService(DirectorRepository directorRepository, CloudinaryService cloudinaryService) {
        this.directorRepository = directorRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public ResponseEntity<List<DirectorResponse>> getAllDirectors() {
        try {
            List<Directors> directors = directorRepository.findAll();
            List<DirectorResponse> directorResponses = directors.stream()
                    .map(director -> new DirectorResponse(director.getDirectorId(), director.getName(),
                            director.getImage(), director.getSlug()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(directorResponses);
        } catch (Exception e) {
            throw new FuncErrorException("Failed to get directors: " + e.getMessage());
        }
    }

    public ResponseEntity<DirectorResponse> getDirectoryBySlug(String slug) {
        try {
            Directors directors = directorRepository.findBySlug(slug)
                    .orElseThrow(() -> new FuncErrorException("Director not found"));
            if (directors == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity
                    .ok(new DirectorResponse(directors.getDirectorId(), directors.getName(), directors.getImage(),
                            directors.getSlug()));
        } catch (Exception e) {
            throw new FuncErrorException("Failed to get director: " + e.getMessage());
        }
    }

    public DirectorResponse createDirector(DirectorRequest directorRequest, MultipartFile image) {
        try {
            if (directorRequest == null || directorRequest.getName() == null
                    || directorRequest.getName().trim().isEmpty()) {
                throw new FuncErrorException("Actor name is required");
            }

            if (directorRepository.findByName(directorRequest.getName()).isPresent()) {
                throw new FuncErrorException("Actor already exists");
            }

            String timeStamp = String.valueOf(System.currentTimeMillis());
            CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(image, "Image_" + timeStamp);

            Directors response = new Directors();
            response.setName(directorRequest.getName());
            response.setImage(cloudinaryResponse.getUrl());

            String slug = SlugGenerator.generateSlug(directorRequest.getName());
            response.setSlug(slug);

            Directors savedDirector = directorRepository.save(response);

            return new DirectorResponse(savedDirector.getDirectorId(), savedDirector.getName(),
                    savedDirector.getImage(),
                    savedDirector.getSlug());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to create director: " + e.getMessage());
        }
    }

    public DirectorResponse updateDirector(Long directorId, DirectorRequest directorRequest, MultipartFile image) {
        try {
            Directors directorExisting = directorRepository.findById(directorId)
                    .orElseThrow(() -> new FuncErrorException("Director not found"));

            directorExisting.setName(
                    directorRequest.getName() != null ? directorRequest.getName() : directorExisting.getName());

            if (image != null) {
                String timeStamp = String.valueOf(System.currentTimeMillis());
                CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(image, "Image_" + timeStamp);
                directorExisting.setImage(cloudinaryResponse.getUrl());
            }

            String slug = SlugGenerator.generateSlug(directorRequest.getName());
            directorExisting.setSlug(slug);

            Directors savedDirector = directorRepository.save(directorExisting);

            return new DirectorResponse(savedDirector.getDirectorId(), savedDirector.getName(),
                    savedDirector.getImage(), savedDirector.getSlug());

        } catch (Exception e) {
            throw new FuncErrorException("Failed to update director: " + e.getMessage());
        }
    }

    public Map<String, String> deleteDirector(Long directorId) {
        try {
            directorRepository.deleteById(directorId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Director deleted successfully");
            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete director: " + e.getMessage());
        }
    }
}
