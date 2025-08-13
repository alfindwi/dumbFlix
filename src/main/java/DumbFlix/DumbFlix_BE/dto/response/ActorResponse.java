package DumbFlix.DumbFlix_BE.dto.response;


import java.io.Serializable;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActorResponse implements Serializable {
    private Long actorId;
    private String name;
    private String image;
    private String slug;
}
