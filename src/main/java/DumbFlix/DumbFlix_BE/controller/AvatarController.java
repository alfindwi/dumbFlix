package DumbFlix.DumbFlix_BE.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.dto.request.AvatarRequest;
import DumbFlix.DumbFlix_BE.dto.response.AvatarResponse;
import DumbFlix.DumbFlix_BE.service.AvatarService;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

    private final AvatarService avatarService;

    public AvatarController(AvatarService avatarService) {
        this.avatarService = avatarService;
    }

    @GetMapping
    public ResponseEntity<List<AvatarResponse>> getAllAvatar() throws Exception {
        List<AvatarResponse> avatarResponses = avatarService.getAllAvatar();
        return ResponseEntity.ok(avatarResponses);
    }

    @PostMapping
    public Map<String, Object> createAvatar(@ModelAttribute AvatarRequest avatarRequest,
            @RequestParam("image") List<MultipartFile> image)
            throws IOException {
        AvatarResponse response = avatarService.createAvatar(avatarRequest, image);
        return Map.of(
                "title", response.getTitle(),
                "images", response.getImage());
    }

}
