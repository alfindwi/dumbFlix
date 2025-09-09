package DumbFlix.DumbFlix_BE.service;

import java.util.List;

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
            return new AvatarResponse(categories.getTitle(), avatars.stream().map(Avatar::getImageUrl).toList());

        } catch (Exception e) {
            throw new FuncErrorException("Failed to create avatar: " + e.getMessage());
        }
    }
}
