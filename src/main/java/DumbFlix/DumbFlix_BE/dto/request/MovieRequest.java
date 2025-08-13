package DumbFlix.DumbFlix_BE.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequest {
    private Long movieId;
    private String title;
    private String description;
    private String year;
    private String trailer;
    private List<Integer> categoryIds;
    private List<Integer> actorsIds;
    private List<Integer> directorsIds;

}
