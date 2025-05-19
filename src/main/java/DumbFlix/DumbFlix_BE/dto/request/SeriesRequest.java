package DumbFlix.DumbFlix_BE.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeriesRequest {
    private Long seriesId;
    private String seriesName;
    private String seriesYear;
    private String description;
    private String trailer;
    private List<Integer> categoryIds;

}
