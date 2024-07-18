package site.coduo.pairroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.exception.InvalidNameFormatException;

@Getter
@NoArgsConstructor
@Entity
public class PairRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FIRST_PAIR", nullable = false)
    private String firstPair;

    @Column(name = "SECOND_PAIR", nullable = false)
    private String secondPair;

    @Embedded
    @Column(name = "ACCESS_CODE", nullable = false)
    private AccessCode accessCode;

    public PairRoom(final String firstPair, final String secondPair) {
        validate(firstPair, secondPair);
        this.firstPair = firstPair;
        this.secondPair = secondPair;
        this.accessCode = new AccessCode();
    }

    private void validate(final String firstPair, final String secondPair) {
        if (StringUtils.isBlank(firstPair) || StringUtils.isBlank(secondPair)) {
            throw new InvalidNameFormatException("페어의 이름이 비어있습니다.");
        }
    }

    @Override
    public String toString() {
        return "PairRoom{" +
               "id=" + id +
               ", firstPair='" + firstPair + '\'' +
               ", secondPair='" + secondPair + '\'' +
               ", accessCode='" + accessCode + '\'' +
               '}';
    }
}
