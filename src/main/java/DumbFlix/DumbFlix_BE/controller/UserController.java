package DumbFlix.DumbFlix_BE.controller;

import DumbFlix.DumbFlix_BE.dto.request.UserRequest;
import DumbFlix.DumbFlix_BE.dto.response.UserResponse;
import DumbFlix.DumbFlix_BE.entity.user.User;
import DumbFlix.DumbFlix_BE.security.model.CustomUserDetails;
import DumbFlix.DumbFlix_BE.service.UserService;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/image")
    public ResponseEntity<UserResponse> updateImage(@AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam("image") MultipartFile image) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()
                    || authentication.getPrincipal() == "anonymousUser") {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            if (userDetails == null) {
                userDetails = (CustomUserDetails) authentication.getPrincipal();
            }

            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            User user = userDetails.getUser();
            UserResponse response = userService.updateImage(user, image);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error saat memperbarui gambar: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateUser(
            @AuthenticationPrincipal User user,
            @ModelAttribute UserRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        UserResponse updatedUser = userService.updateUser(user, request, image);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        Map<String, String> response = userService.deleteUser(userId);
        return ResponseEntity.ok(response);
    }
}
