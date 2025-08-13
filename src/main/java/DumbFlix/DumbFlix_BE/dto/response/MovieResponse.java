package DumbFlix.DumbFlix_BE.dto.response;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import DumbFlix.DumbFlix_BE.dto.helper.Views;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponse implements Serializable {

    @JsonView(Views.Simple.class)
    private Long movieId;

    @JsonView(Views.Simple.class)
    private String title;

    @JsonView(Views.Simple.class)
    private String description;

    @JsonView(Views.Simple.class)
    private String year;

    @JsonView(Views.Simple.class)
    private String trailer;

    @JsonView(Views.Simple.class)
    private String thumbnail;

    @JsonView(Views.Full.class)
    private String video;

    @JsonView(Views.Simple.class)
    private String slug;

    @JsonView(Views.Simple.class)
    private String poster;

    @JsonView(Views.Full.class)
    private List<CategoryResponse> categories;
    
    @JsonView(Views.Full.class)
    private List<ActorResponse> actors;

    @JsonView(Views.Full.class)
    private List<DirectorResponse> directors;
}
