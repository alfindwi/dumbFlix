package DumbFlix.DumbFlix_BE.dto.response;


import java.io.Serializable;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DirectorResponse implements Serializable {
    private Long directorId;
    private String name;
    private String image;
    private String slug;
}
