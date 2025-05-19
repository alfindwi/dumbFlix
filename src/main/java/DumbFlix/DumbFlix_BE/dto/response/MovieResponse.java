package DumbFlix.DumbFlix_BE.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MovieResponse {
    private Long movieId;
    private String title;
    private String description;
    private String year;
    private String trailer;
    private String thumbnail;
    private String video;
    private String poster;
    private List<CategoryResponse> categories;
}
