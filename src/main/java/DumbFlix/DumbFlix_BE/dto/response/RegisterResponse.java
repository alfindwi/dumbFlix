package DumbFlix.DumbFlix_BE.dto.response;

import DumbFlix.DumbFlix_BE.entity.user.Role;
import DumbFlix.DumbFlix_BE.entity.user.Status; // Gunakan Status dari entity
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String email;
    private String password;
    private String fullName;
    private String image;
    private String phone;
    private String address;
    private String gender;
    private Status status;
    private Role role;
}
