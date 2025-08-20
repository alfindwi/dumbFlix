package DumbFlix.DumbFlix_BE.dto.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponse implements Serializable {

    private Long movieId;

    private String title;

    private String description;

    private String year;

    private String trailer;

    private String thumbnail;

    private String video;

    private String slug;

    private String poster;

    private List<CategoryResponse> categories;
    
    private List<ActorResponse> actors;

    private List<DirectorResponse> directors;
}
