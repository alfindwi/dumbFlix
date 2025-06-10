package DumbFlix.DumbFlix_BE.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeriesResponse {
    private Long seriesId;
    private String seriesName;
    private String seriesYear;
    private String poster;
    private String description;
    private String seriesSlug;
    private String trailer;
    private List<CategoryResponse> categories;
    private List<SeasonResponse> seasons;
}
