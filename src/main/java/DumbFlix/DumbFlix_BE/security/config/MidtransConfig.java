package DumbFlix.DumbFlix_BE.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "mt")
public class MidtransConfig {

    private String serverKey;
    private boolean isProduction;
}
