package DumbFlix.DumbFlix_BE.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Subcription;
import DumbFlix.DumbFlix_BE.repository.SubscriptionRepository;

@Service
public class SubcriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public boolean isUserSubscribed(String fullName) {
        return subscriptionRepository.findByUser_fullName(fullName)
                .map(subscription -> subscription.isActive())
                .orElse(false);
    }

    public Optional<Subcription> getSubscriptionByfullName(String fullName) {
        return subscriptionRepository.findByUser_fullName(fullName);
    }

}
