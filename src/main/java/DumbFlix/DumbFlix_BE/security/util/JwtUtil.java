package DumbFlix.DumbFlix_BE.security.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Component
public class JwtUtil {

    private final String secretKey;
    private static final long expirationMs = 86400000;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
    }
    

    public String generateToken(Long id, String email, String fullName, String image, String address, String phone,
            String gender,
            String status, String role) {
        return JWT.create()
                .withClaim("id", id)
                .withClaim("email", email)
                .withClaim("fullName", fullName)
                .withClaim("image", image)
                .withClaim("address", address)
                .withClaim("phone", phone)
                .withClaim("gender", gender)
                .withClaim("status", status)
                .withClaim("role", role)
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public boolean validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWT.require(algorithm).build().verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String extractEmail(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.require(algorithm).build()
                .verify(token)
                .getClaim("email")
                .asString();
    }

    public Long extractUserId(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.require(algorithm).build()
                .verify(token)
                .getClaim("id")
                .asLong();
    }

}
