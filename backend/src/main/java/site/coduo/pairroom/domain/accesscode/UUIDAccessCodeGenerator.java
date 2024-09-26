package site.coduo.pairroom.domain.accesscode;

import java.util.UUID;

public class UUIDAccessCodeGenerator {

    private static final int ACCESS_CODE_LENGTH = 6;

    public static String generate() {
        return UUID.randomUUID()
                .toString()
                .substring(0, ACCESS_CODE_LENGTH);
    }
}
