package DumbFlix.DumbFlix_BE.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EpisodeRequest {
    private String episodeName;
    private Integer episodeNumber;
    private String episodeDescription;
    private Long seasonId;
}
