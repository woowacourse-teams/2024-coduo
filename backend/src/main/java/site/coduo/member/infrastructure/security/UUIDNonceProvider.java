package site.coduo.member.infrastructure.security;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class UUIDNonceProvider implements NonceProvider {

    @Override
    public String generate() {
        return UUID.randomUUID().toString();
    }
}
