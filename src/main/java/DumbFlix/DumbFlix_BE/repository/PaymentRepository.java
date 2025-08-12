package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId (String orderId);
}
