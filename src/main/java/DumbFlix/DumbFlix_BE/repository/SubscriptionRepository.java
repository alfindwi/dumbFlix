package DumbFlix.DumbFlix_BE.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Subcription;

public interface SubscriptionRepository extends JpaRepository<Subcription, Long> {
    Optional<Subcription> findByUser_fullName(String fullName);
}
