package DumbFlix.DumbFlix_BE.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResultResponse {
    private String type;
    private String title;
    private String slug;
    private String poster;
    private String description;
    private String year;
}
