package DumbFlix.DumbFlix_BE.entity.subsPayment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import DumbFlix.DumbFlix_BE.entity.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "subcription")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status = SubscriptionStatus.PENDING;


    private java.time.LocalDate startDate;
    private java.time.LocalDate endDate;

    @OneToMany(mappedBy = "subscription", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments = new ArrayList<>();

    public boolean isActive() {
        return status == SubscriptionStatus.ACTIVE &&
                LocalDate.now().isAfter(startDate.minusDays(1)) &&
                LocalDate.now().isBefore(endDate.plusDays(1));
    }

}

