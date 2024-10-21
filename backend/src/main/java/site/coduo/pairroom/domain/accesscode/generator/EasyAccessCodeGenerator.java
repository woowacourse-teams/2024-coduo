package site.coduo.pairroom.domain.accesscode.generator;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class EasyAccessCodeGenerator implements AccessCodeGenerator {

    private static final String POST_POSITION_WITH_FINAL_CONSONANT = "과";
    private static final String POST_POSITION_WITHOUT_FINAL_CONSONANT = "와";
    private static final String BLANK = " ";
    private static final int KOREAN_SYLLABLE_START = 0xAC00; // "가"
    private static final int KOREAN_SYLLABLE_END = 0xD7A3;   // "힣"
    private static final int FINAL_CONSONANT_COUNT = 28;
    private static final int NO_FINAL_CONSONANT = 0;

    private final String driver;
    private final String navigator;

    @Override
    public String generate() {
        final Adjective driverAdjective = Adjective.pickRandom();
        return driverAdjective + driver +
                getPostposition() +
                pickNavigatorAdjective(driverAdjective) + navigator;
    }

    private String getPostposition() {
        final char lastChar = driver.charAt(driver.length() - 1);
        if (isKorean(lastChar) && hasFinalConsonant(lastChar)) {
            return POST_POSITION_WITH_FINAL_CONSONANT + BLANK;
        }
        return POST_POSITION_WITHOUT_FINAL_CONSONANT + BLANK;
    }

    private boolean isKorean(final char c) {
        return c >= KOREAN_SYLLABLE_START && c <= KOREAN_SYLLABLE_END;
    }

    private boolean hasFinalConsonant(final char c) {
        return (c - KOREAN_SYLLABLE_START) % FINAL_CONSONANT_COUNT > NO_FINAL_CONSONANT;
    }

    private Adjective pickNavigatorAdjective(final Adjective driverAdjective) {
        final Adjective adjective = Adjective.pickRandom();
        if (adjective == driverAdjective) {
            return pickNavigatorAdjective(driverAdjective);
        }
        return adjective;
    }

    @Override
    public boolean isEasyAccessCodeGenerator() {
        return true;
    }
}
