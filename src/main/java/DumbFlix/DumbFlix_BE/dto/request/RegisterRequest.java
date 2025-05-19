package DumbFlix.DumbFlix_BE.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private Optional<String> image;
    private String phone;
    private String address;
    private String gender;
    private String status;
    private String role;
}
