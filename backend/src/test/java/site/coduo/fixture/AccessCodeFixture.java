package site.coduo.fixture;

import site.coduo.pairroom.domain.accesscode.AccessCode;

public class AccessCodeFixture {

    public static final AccessCode ACCESS_CODE = new AccessCode("c0d1ng");
    public static final AccessCode NUMBER_ACCESS_CODE = new AccessCode("123456");
    public static final AccessCode ALPHABET_ACCESS_CODE = new AccessCode("abcdef");

    public static final AccessCode EASY_ACCESS_CODE_FRAM_LEMONE = new AccessCode("짓궂은프람과 언짢은레모네");
    public static final AccessCode EASY_ACCESS_CODE_INK_REDDY = new AccessCode("아픈잉크와 동그란레디");
    public static final AccessCode EASY_ACCESS_CODE_KELLY_LEMONE = new AccessCode("고달픈켈리와 아름다운레모네");
}
