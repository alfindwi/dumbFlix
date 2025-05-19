package DumbFlix.DumbFlix_BE.dto.response;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private Long id;
    private String categoryName;
}
