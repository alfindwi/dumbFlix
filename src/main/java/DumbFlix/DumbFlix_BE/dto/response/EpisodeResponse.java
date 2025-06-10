package DumbFlix.DumbFlix_BE.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EpisodeResponse {
    private Long episodeId;
    private String episodeName;
    private int episodeNumber;
    private String episodeDescription;
    private String episodeImage;
    private String episodeVideo;
    private String episodeSlug;
}
