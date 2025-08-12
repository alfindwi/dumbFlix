package DumbFlix.DumbFlix_BE.entity.subsPayment;

import java.math.BigDecimal;
import java.time.LocalDate;

import DumbFlix.DumbFlix_BE.entity.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "payment")
@Setter
@Getter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.MIDTRANS;

    private BigDecimal amount;

    private LocalDate paymentDate;

    private String orderId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;
}
