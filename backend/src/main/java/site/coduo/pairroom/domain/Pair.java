package site.coduo.pairroom.domain;

import java.util.Objects;

import site.coduo.pairroom.exception.DuplicatePairNameException;

public class Pair {

    private final PairName navigator;
    private final PairName driver;

    public Pair(final PairName navigator, final PairName driver) {
        validate(navigator, driver);
        this.navigator = navigator;
        this.driver = driver;
    }

    public void validate(final PairName navigator, final PairName driver) {
        if (Objects.equals(navigator, driver)) {
            throw new DuplicatePairNameException("페어의 이름이 중복되었습니다.");
        }
    }

    public String getNavigatorName() {
        return navigator.getValue();
    }

    public String getDriverName() {
        return driver.getValue();
    }

    @Override
    public String toString() {
        return "Pair{" +
                "navigator=" + navigator +
                ", driver=" + driver +
                '}';
    }
}
