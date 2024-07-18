package site.coduo.pairroom.domain;

import java.util.Objects;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.pairroom.exception.DuplicatePairNameException;

@Embeddable
@NoArgsConstructor
@Getter
public class Pair {

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "FIRST_PAIR", nullable = false))
    private PairName firstPair;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "SECOND_PAIR", nullable = false))
    private PairName secondPair;

    public Pair(final PairName firstPair, final PairName secondPair) {
        validate(firstPair, secondPair);
        this.firstPair = firstPair;
        this.secondPair = secondPair;
    }

    public void validate(final PairName firstPair, final PairName secondPair) {
        if (Objects.equals(firstPair, secondPair)) {
            throw new DuplicatePairNameException("페어의 이름이 중복되었습니다.");
        }
    }

    @Override
    public String toString() {
        return "Pair{" +
                "firstPair=" + firstPair +
                ", secondPair=" + secondPair +
                '}';
    }
}
