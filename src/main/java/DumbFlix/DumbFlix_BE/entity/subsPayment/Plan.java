package DumbFlix.DumbFlix_BE.entity.subsPayment;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "plan")
@Getter
@Setter
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    private String name;
    private BigDecimal price;
    private Integer durationDays;
    private String description;
    private String resolution;
    private String devices;
    private String gradient;
}
