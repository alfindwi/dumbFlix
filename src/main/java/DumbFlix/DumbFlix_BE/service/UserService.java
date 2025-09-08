package DumbFlix.DumbFlix_BE.service;

import DumbFlix.DumbFlix_BE.dto.request.UserRequest;
import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.dto.response.UserResponse;
import DumbFlix.DumbFlix_BE.entity.user.User;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.UserRepository;
import DumbFlix.DumbFlix_BE.security.model.CustomUserDetails;
import DumbFlix.DumbFlix_BE.security.util.JwtUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, CloudinaryService cloudinaryService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));
        return new CustomUserDetails(user);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .image(user.getImage())
                        .address(user.getAddress())
                        .fullName(user.getFullName())
                        .phone(user.getPhone())
                        .gender(user.getGender())
                        .role(user.getRole().toString())
                        .status(user.getStatus().toString())
                        .password(user.getPassword())
                        .build())
                .toList();
    }

    public User getCurrentUser(String token) {
        String email = jwtUtil.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponse updateImage(User user, MultipartFile file) {
        try {
            User userInDb = userRepository.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

            String timeStamp = String.valueOf(System.currentTimeMillis());
            CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadImage(file, "Image_" + timeStamp);

            userInDb.setImage(cloudinaryResponse.getUrl());

            userRepository.save(userInDb);

            return UserResponse.builder()
                    .id(userInDb.getId())
                    .email(userInDb.getEmail())
                    .fullName(userInDb.getFullName())
                    .image(userInDb.getImage())
                    .address(userInDb.getAddress())
                    .phone(userInDb.getPhone())
                    .gender(userInDb.getGender())
                    .role(userInDb.getRole().toString())
                    .status(userInDb.getStatus().toString())
                    .password(userInDb.getPassword())
                    .build();
        } catch (Exception e) {
            System.err.println("❌ Gagal memperbarui gambar: " + e.getMessage());
            throw new RuntimeException("Gagal memperbarui gambar: " + e.getMessage());
        }
    }

    public UserResponse updateUser(String email, UserRequest request) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        if (request.getImage() != null)
            existingUser.setImage(request.getImage());

        if (request.getFullName() != null)
            existingUser.setFullName(request.getFullName());
        if (request.getAddress() != null)
            existingUser.setAddress(request.getAddress());
        if (request.getPhone() != null)
            existingUser.setPhone(request.getPhone());
        if (request.getGender() != null)
            existingUser.setGender(request.getGender());

        userRepository.save(existingUser);

        return UserResponse.builder()
                .id(existingUser.getId())
                .email(existingUser.getEmail())
                .fullName(existingUser.getFullName())
                .image(existingUser.getImage())
                .address(existingUser.getAddress())
                .phone(existingUser.getPhone())
                .gender(existingUser.getGender())
                .role(existingUser.getRole().toString())
                .status(existingUser.getStatus().toString())
                .password(existingUser.getPassword())
                .build();
    }

    public Map<String, String> deleteUser(Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isEmpty()) {
                throw new FuncErrorException("User not found");
            }

            userRepository.delete(user.get());

            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");

            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete user: " + e.getMessage());
        }
    }
}
