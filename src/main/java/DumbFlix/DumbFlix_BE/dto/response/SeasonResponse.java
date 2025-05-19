package DumbFlix.DumbFlix_BE.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeasonResponse {
    private Long seasonId;
    private int seasonNumber;
    private List<EpisodeResponse> episodes;
}
