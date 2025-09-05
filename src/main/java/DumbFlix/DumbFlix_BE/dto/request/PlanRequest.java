package DumbFlix.DumbFlix_BE.dto.request;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanRequest {
    private Long planId;
    private String name;
    private BigDecimal price;
    private Integer durationDays;
    private String resolution;
    private String  devices;
    private String description;
    private String gradient;
}
