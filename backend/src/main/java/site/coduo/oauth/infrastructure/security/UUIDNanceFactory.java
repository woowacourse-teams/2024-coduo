package site.coduo.oauth.infrastructure.security;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class UUIDNanceFactory implements NanceFactory {

    @Override
    public String generate() {
        return UUID.randomUUID().toString();
    }
}
