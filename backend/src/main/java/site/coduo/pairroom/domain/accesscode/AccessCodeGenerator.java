package site.coduo.pairroom.domain.accesscode;

public class AccessCodeGenerator {

    private static final String POST_POSITION_WITH_FINAL_CONSONANT = "과";
    private static final String POST_POSITION_WITHOUT_FINAL_CONSONANT = "와";
    private static final String BLANK = " ";
    private static final int KOREAN_SYLLABLE_START = 0xAC00; // "가"
    private static final int KOREAN_SYLLABLE_END = 0xD7A3;   // "힣"
    private static final int FINAL_CONSONANT_COUNT = 28;
    private static final int NO_FINAL_CONSONANT = 0;

    public static String generate(final String driver, final String navigator) {
        final Adjective driverAdjective = Adjective.pickRandom();
        return driverAdjective + driver +
                getPostposition(driver) +
                pickNavigatorAdjective(driverAdjective) + navigator;
    }

    private static String getPostposition(final String name) {
        final char lastChar = name.charAt(name.length() - 1);
        if (isKorean(lastChar) && hasFinalConsonant(lastChar)) {
            return POST_POSITION_WITH_FINAL_CONSONANT + BLANK;
        }
        return POST_POSITION_WITHOUT_FINAL_CONSONANT + BLANK;
    }

    private static boolean isKorean(final char c) {
        return c >= KOREAN_SYLLABLE_START && c <= KOREAN_SYLLABLE_END;
    }

    private static boolean hasFinalConsonant(final char c) {
        return (c - KOREAN_SYLLABLE_START) % FINAL_CONSONANT_COUNT > NO_FINAL_CONSONANT;
    }

    private static Adjective pickNavigatorAdjective(final Adjective driverAdjective) {
        final Adjective adjective = Adjective.pickRandom();
        if (adjective == driverAdjective) {
            return pickNavigatorAdjective(driverAdjective);
        }
        return adjective;
    }
}
