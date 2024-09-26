package site.coduo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CoduoApplication {

    public static void main(final String[] args) {
        SpringApplication.run(CoduoApplication.class, args);
    }
}
