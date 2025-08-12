package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUser_fullName(String fullName);
    Optional<Subscription> findByUser_Id(Long Id);
}
