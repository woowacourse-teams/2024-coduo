package site.coduo.common.infrastructure.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

    @Value("${jwt.sign-key}")
    private String key;

    public String sign(String sub) {
        return Jwts.builder()
                .issuedAt(new Date())
                .subject(sub)
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    public void verify(String token) {
        Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parse(token);
    }

    public String extractSubject(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
