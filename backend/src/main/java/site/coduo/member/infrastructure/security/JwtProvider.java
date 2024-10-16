package site.coduo.member.infrastructure.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    @Value("${jwt.sign-key}")
    private String key;

    public String sign(final String sub) {
        return Jwts.builder()
                .issuedAt(new Date())
                .subject(sub)
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    public String extractSubject(final String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isValid(final String token) {
        try {
            verify(token);
            return true;
        } catch (final Exception e) {
            return false;
        }
    }

    private void verify(final String token) {
        Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parse(token);
    }
}
