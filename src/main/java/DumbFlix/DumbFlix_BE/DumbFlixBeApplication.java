package DumbFlix.DumbFlix_BE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DumbFlixBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DumbFlixBeApplication.class, args);
    }

}
