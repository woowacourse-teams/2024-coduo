package site.coduo.pairroom.domain.accesscode;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AccessCodeFactory {

    private final AccessCodeStrategy strategy;

    public AccessCode generate(final List<AccessCode> accessCodes) {
        final AccessCode accessCode = new AccessCode(strategy.generateAccessCode());
        if (accessCodes.contains(accessCode)) {
            return generate(accessCodes);
        }
        return accessCode;
    }
}
