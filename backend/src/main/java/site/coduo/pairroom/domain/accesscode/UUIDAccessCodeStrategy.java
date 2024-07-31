package site.coduo.pairroom.domain.accesscode;

import java.util.UUID;

public class UUIDAccessCodeStrategy implements AccessCodeStrategy {

    @Override
    public String generateAccessCode() {
        return UUID.randomUUID()
                .toString()
                .substring(0, ACCESS_CODE_LENGTH);
    }
}
