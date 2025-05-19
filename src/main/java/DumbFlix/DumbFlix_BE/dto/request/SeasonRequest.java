package DumbFlix.DumbFlix_BE.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeasonRequest {
    private Long seriesId;
    private Integer seasonNumber;
}
