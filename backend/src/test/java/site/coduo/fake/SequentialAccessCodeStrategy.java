package site.coduo.fake;

import java.util.List;

import site.coduo.pairroom.domain.accesscode.AccessCodeStrategy;

public class SequentialAccessCodeStrategy implements AccessCodeStrategy {

    private static final List<String> SEQUENCE = List.of("1", "2", "3", "4", "5");

    private static int INDEX = 0;

    @Override
    public String generateAccessCode() {
        return ("FAKE_" + SEQUENCE.get(INDEX++))
                .substring(0, ACCESS_CODE_LENGTH);
    }
}
