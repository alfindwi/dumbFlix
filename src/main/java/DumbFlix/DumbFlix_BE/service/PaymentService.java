package DumbFlix.DumbFlix_BE.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.midtrans.Midtrans;
import com.midtrans.httpclient.SnapApi;
import com.midtrans.httpclient.error.MidtransError;

import DumbFlix.DumbFlix_BE.entity.subsPayment.Payment;
import DumbFlix.DumbFlix_BE.entity.subsPayment.PaymentMethod;
import DumbFlix.DumbFlix_BE.entity.subsPayment.PaymentStatus;
import DumbFlix.DumbFlix_BE.entity.subsPayment.Plan;
import DumbFlix.DumbFlix_BE.entity.subsPayment.Subscription;
import DumbFlix.DumbFlix_BE.entity.subsPayment.SubscriptionStatus;
import DumbFlix.DumbFlix_BE.entity.user.Status;
import DumbFlix.DumbFlix_BE.entity.user.User;
import DumbFlix.DumbFlix_BE.repository.PaymentRepository;
import DumbFlix.DumbFlix_BE.repository.PlanRepository;
import DumbFlix.DumbFlix_BE.repository.SubscriptionRepository;
import DumbFlix.DumbFlix_BE.repository.UserRepository;
import DumbFlix.DumbFlix_BE.security.config.MidtransConfig;
import jakarta.validation.Valid;

@Service
public class PaymentService {

    @Valid
    private final SnapApi snapApi;
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(MidtransConfig midtransConfig, PlanRepository planRepository, UserRepository userRepository,
            SubscriptionRepository subscriptionRepository, PaymentRepository paymentRepository) {
        Midtrans.serverKey = midtransConfig.getServerKey();
        Midtrans.isProduction = midtransConfig.isProduction();
        this.planRepository = planRepository;
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.paymentRepository = paymentRepository;
        snapApi = new SnapApi();
    }

    public Map<String, Object> createTransaction(Long planId, String email) throws MidtransError {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setStatus(SubscriptionStatus.PENDING);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(plan.getDurationDays()));
        subscriptionRepository.save(subscription);

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setSubscription(subscription);
        payment.setAmount(plan.getPrice());
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentMethod(PaymentMethod.MIDTRANS);
        paymentRepository.save(payment);

        // Generate Order ID
        String orderId = "SUBS-" + payment.getId() + "-" + System.currentTimeMillis();

        Map<String, Object> params = new HashMap<>();
        Map<String, Object> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", orderId);
        transactionDetails.put("gross_amount", plan.getPrice());

        Map<String, Object> customerDetails = new HashMap<>();
        customerDetails.put("fullName", user.getFullName());
        customerDetails.put("email", user.getEmail());
        customerDetails.put("phone", user.getPhone());

        params.put("transaction_details", transactionDetails);
        params.put("customer_details", customerDetails);

        org.json.JSONObject snapResponse = SnapApi.createTransaction(params);
        String redirectUrl = snapResponse.getString("redirect_url");

        return Map.of(
                "status", "pending",
                "payment_method", "midtrans",
                "order_id", orderId,
                "amount", plan.getPrice(),
                "redirect_url", redirectUrl);
    }

    public void handleNotification(Map<String, Object> notification) {
        String orderId = (String) notification.get("order_id");
        String transactionStatus = (String) notification.get("transaction_status");

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        Subscription subscription = payment.getSubscription();
        User user = payment.getUser();

        if ("settlement".equalsIgnoreCase(transactionStatus) ||
                "capture".equalsIgnoreCase(transactionStatus)) {
            payment.setPaymentStatus(PaymentStatus.PAID);
            subscription.setStatus(SubscriptionStatus.ACTIVE);
            user.setStatus(Status.Active);
        } else if ("cancel".equalsIgnoreCase(transactionStatus) ||
                "deny".equalsIgnoreCase(transactionStatus) ||
                "expire".equalsIgnoreCase(transactionStatus)) {
            payment.setPaymentStatus(PaymentStatus.CANCELLED);
            subscription.setStatus(SubscriptionStatus.CANCELLED);
        }

        paymentRepository.save(payment);
        subscriptionRepository.save(subscription);
        userRepository.save(user);
    }

}