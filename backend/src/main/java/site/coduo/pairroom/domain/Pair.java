package site.coduo.pairroom.domain;

import java.util.Objects;

import site.coduo.pairroom.exception.DuplicatePairNameException;

public class Pair {

    private final PairName firstPair;
    private final PairName secondPair;

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

    public String getFirstPairName() {
        return firstPair.getValue();
    }

    public String getSecondPairName() {
        return secondPair.getValue();
    }

    @Override
    public String toString() {
        return "Pair{" +
                "firstPair=" + firstPair +
                ", secondPair=" + secondPair +
                '}';
    }
}
