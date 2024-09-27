package site.coduo.pairroom.domain.accesscode;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UUIDAccessCodeGenerator {

    private static final int ACCESS_CODE_LENGTH = 9;

    @Value("${ec2.prefix}")
    private String prefix;

    public String generate() {
        return prefix + UUID.randomUUID()
                .toString()
                .substring(0, ACCESS_CODE_LENGTH);
    }
}
