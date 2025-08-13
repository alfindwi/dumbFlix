package DumbFlix.DumbFlix_BE.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DirectorRequest {
    private Long directorId;
    private String name;
    private String slug;
}
