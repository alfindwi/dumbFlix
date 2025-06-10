package DumbFlix.DumbFlix_BE.dto.response;


import java.io.Serializable;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse implements Serializable {
    private Long id;
    private String categoryName;
}
