package site.coduo.pairroom.domain.accesscode.generator;

import java.util.UUID;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UUIDAccessCodeGenerator implements AccessCodeGenerator {

    private static final int ACCESS_CODE_LENGTH = 9;

    @Override
    public String generate() {
        String uuid = UUID.randomUUID()
                .toString();
        String replace = uuid.replace("-", "");
        return replace.substring(0, ACCESS_CODE_LENGTH);
    }

    @Override
    public boolean isEasyAccessCodeGenerator() {
        return false;
    }
}
