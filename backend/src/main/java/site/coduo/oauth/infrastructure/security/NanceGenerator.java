package site.coduo.oauth.infrastructure.security;

public interface NanceGenerator {

    String generate();

    void verify(String origin, String other);
}
