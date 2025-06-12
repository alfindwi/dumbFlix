package DumbFlix.DumbFlix_BE.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DumbFlix.DumbFlix_BE.dto.request.LoginRequest;
import DumbFlix.DumbFlix_BE.dto.request.RegisterRequest;
import DumbFlix.DumbFlix_BE.dto.response.LoginResponse;
import DumbFlix.DumbFlix_BE.dto.response.RegisterResponse;
import DumbFlix.DumbFlix_BE.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse registerResponse = authService.register(request);
        return ResponseEntity.ok(registerResponse);
    }
}
