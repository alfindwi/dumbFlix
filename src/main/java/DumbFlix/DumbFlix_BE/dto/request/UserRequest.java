package DumbFlix.DumbFlix_BE.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequest {
    private Long userId;
    private String fullName;
    private String phone;
    private String address;
    private String gender;
    private String image;
}
