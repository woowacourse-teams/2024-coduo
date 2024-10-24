package site.coduo.pairroom.domain.accesscode.generator;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UUIDAccessCodeGenerator implements AccessCodeGenerator {

    private static final int ACCESS_CODE_LENGTH = 9;

    @Value("${ec2.prefix}")
    private String prefix;

    @Override
    public String generate() {
        return prefix + UUID.randomUUID()
                .toString()
                .substring(0, ACCESS_CODE_LENGTH);
    }

    @Override
    public boolean isEasyAccessCodeGenerator() {
        return false;
    }
}
