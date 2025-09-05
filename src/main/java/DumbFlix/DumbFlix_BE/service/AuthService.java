package DumbFlix.DumbFlix_BE.service;

import DumbFlix.DumbFlix_BE.dto.request.LoginRequest;
import DumbFlix.DumbFlix_BE.dto.request.RegisterRequest;
import DumbFlix.DumbFlix_BE.dto.response.LoginResponse;
import DumbFlix.DumbFlix_BE.dto.response.RegisterResponse;
import DumbFlix.DumbFlix_BE.dto.response.UserResponse;
import DumbFlix.DumbFlix_BE.entity.user.Role;
import DumbFlix.DumbFlix_BE.entity.user.Status;
import DumbFlix.DumbFlix_BE.entity.user.User;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.UserRepository;
import DumbFlix.DumbFlix_BE.security.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {

        // cek email dan password
        if (request.getEmail() == null || request.getEmail().isBlank() || request.getPassword() == null
                || request.getPassword().isBlank()) {
            throw new FuncErrorException("Email and password are required");
        }

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        System.out.println("User found: " + userOptional.isPresent());

        if (userOptional.isEmpty()) {
            throw new FuncErrorException("User not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            throw new FuncErrorException("Email or password is incorrect");
        }

        org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userOptional.get();

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getImage(),
                user.getAddress(),
                user.getPhone(),
                user.getGender(),
                user.getStatus().name(),
                user.getRole().name());

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getFullName(),
                user.getImage(),
                user.getPhone(),
                user.getAddress(),
                user.getGender(),
                user.getRole().name(),
                user.getStatus().name());

        return new LoginResponse(
                token, userResponse);
    }

    public RegisterResponse register(RegisterRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new FuncErrorException("Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new FuncErrorException("Password is required");
        }

        if (request.getFullName() == null || request.getFullName().isBlank()) {
            throw new FuncErrorException("Full name is required");
        }


        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new FuncErrorException("User already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setGender(request.getGender());
        user.setStatus(Status.NotActive);
        user.setImage(request.getImage().orElse(null));

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getPassword(),
                savedUser.getFullName(),
                savedUser.getImage(),
                savedUser.getPhone(),
                savedUser.getAddress(),
                savedUser.getGender(),
                savedUser.getStatus(),
                savedUser.getRole());
    }
}
