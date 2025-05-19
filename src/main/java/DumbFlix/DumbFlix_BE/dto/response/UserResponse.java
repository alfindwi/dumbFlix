package DumbFlix.DumbFlix_BE.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String password;
    private String fullName;
    private String image; 
    private String phone;
    private String address;
    private String gender;
    private String role;
    private String status;
}
