package site.coduo.pairroom.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
public class AccessCode {

    private static final int ACCESS_CODE_LENGTH = 6;

    @Column(name = "ACCESS_CODE", length = ACCESS_CODE_LENGTH, nullable = false)
    private final String value;

    public AccessCode() {
        this.value = UUID.randomUUID()
                .toString()
                .substring(0, ACCESS_CODE_LENGTH);
    }

    public AccessCode(final String value) {
        this.value = value;
    }
}
