package site.coduo.referencelink.domain;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import site.coduo.pairroom.domain.AccessCode;
import site.coduo.referencelink.exception.InvalidUrlFormatException;

@Getter
public class ReferenceLink {

    private final String url;
    private final AccessCode accessCode;

    public ReferenceLink(final String url, final AccessCode accessCode) {
        validate(url);
        this.url = url;
        this.accessCode = accessCode;
    }

    private void validate(final String url) {
        if (StringUtils.isBlank(url)) {
            throw new InvalidUrlFormatException("url이 비어있습니다.");
        }
    }
}
