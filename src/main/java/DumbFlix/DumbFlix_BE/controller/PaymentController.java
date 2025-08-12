package DumbFlix.DumbFlix_BE.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.midtrans.httpclient.error.MidtransError;

import DumbFlix.DumbFlix_BE.security.util.JwtUtil;
import DumbFlix.DumbFlix_BE.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    public PaymentController(PaymentService paymentService, JwtUtil jwtUtil) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/{planId}")
    public ResponseEntity<?> createTransaction(@PathVariable Long planId, HttpServletRequest request)
            throws MidtransError {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            Map<String, Object> response = paymentService.createTransaction(planId, email);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/notification")
    public String handleNotification(@RequestBody Map<String, Object> notification) {
        paymentService.handleNotification(notification);
        return "OK";
    }
}
