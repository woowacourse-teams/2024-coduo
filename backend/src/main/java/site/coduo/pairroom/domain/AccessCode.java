package site.coduo.pairroom.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record AccessCode(
        @Column(name = "ACCESS_CODE", length = ACCESS_CODE_LENGTH, nullable = false) String value
) {

    private static final int ACCESS_CODE_LENGTH = 6;

    public static AccessCode generate() {
        return new AccessCode(UUID.randomUUID().toString().substring(0, ACCESS_CODE_LENGTH));
    }
}
