package DumbFlix.DumbFlix_BE.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.AvatarRequest;
import DumbFlix.DumbFlix_BE.dto.response.AvatarResponse;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.entity.avatar.Avatar;
import DumbFlix.DumbFlix_BE.entity.avatar.AvatarCategories;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.AvatarCategoryRepository;

@Service

public class AvatarService {

    private final AvatarCategoryRepository categoryRepo;
    private final CloudinaryService cloudinaryService;

    public AvatarService(AvatarCategoryRepository categoryRepo, CloudinaryService cloudinaryService) {
        this.categoryRepo = categoryRepo;
        this.cloudinaryService = cloudinaryService;
    }

    public List<AvatarResponse> getAllAvatar() {
        return categoryRepo.findAll().stream().map(categories -> new AvatarResponse(categories.getTitle(),
                categories.getAvatars().stream().map(Avatar::getImageUrl).toList())).toList();
    }

    public AvatarResponse createAvatar(AvatarRequest avatarRequest, List<MultipartFile> image) {
        try {
            if (avatarRequest.getTitle() == null || avatarRequest.getTitle().isBlank()) {
                throw new FuncErrorException("Avatar title is required");
            }

            if (categoryRepo.findByTitle(avatarRequest.getTitle()).isPresent()) {
                throw new FuncErrorException("Avatar already exists");
            }

            AvatarCategories categories = new AvatarCategories();
            categories.setTitle(avatarRequest.getTitle());

            List<Avatar> avatars = image.stream().map(file -> {
                try {
                    CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(file, "Avatar");
                    Avatar avatar = new Avatar();
                    avatar.setImageUrl(cloudinaryResponse.getUrl());
                    avatar.setCategories(categories);
                    return avatar;
                } catch (Exception e) {
                    throw new RuntimeException("Upload gagal: " + file.getOriginalFilename(), e);
                }
            }).toList();

            categories.setAvatars(avatars);
            categoryRepo.save(categories);
            return new AvatarResponse(categories.getTitle(), avatars.stream().map(Avatar::getImageUrl).toList());

        } catch (Exception e) {
            throw new FuncErrorException("Failed to create avatar: " + e.getMessage());
        }
    }

    public AvatarResponse updateAvatar(Long avatarId, AvatarRequest avatarRequest, List<MultipartFile> image) {
        try {
            AvatarCategories existingCategories = categoryRepo.findById(avatarId)
                    .orElseThrow(() -> new FuncErrorException("Avatar not found"));

            existingCategories.setTitle(
                    avatarRequest.getTitle() != null ? avatarRequest.getTitle() : existingCategories.getTitle());

            if (image != null && !image.isEmpty()) {
                List<Avatar> avatars = image.stream().map(file -> {
                    try {
                        CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(file, "Avatar");
                        Avatar avatar = new Avatar();
                        avatar.setImageUrl(cloudinaryResponse.getUrl());
                        avatar.setCategories(existingCategories);
                        return avatar;
                    } catch (Exception e) {
                        throw new RuntimeException("Upload gagal: " + file.getOriginalFilename(), e);
                    }
                }).toList();

                existingCategories.getAvatars().addAll(avatars);
            }

            categoryRepo.save(existingCategories);

            return new AvatarResponse(
                    existingCategories.getTitle(),
                    existingCategories.getAvatars().stream()
                            .map(Avatar::getImageUrl)
                            .toList());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to update avatar: " + e.getMessage());
        }
    }

    public Map<String, String> deleteAvatar(Long avatarId) {
        try {
            categoryRepo.deleteById(avatarId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Avatar deleted successfully");
            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete avatar: " + e.getMessage());
        }
    }

}
