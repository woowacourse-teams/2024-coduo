package site.coduo.referencelink.domain;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import site.coduo.referencelink.exception.InvalidUrlFormatException;

@Getter
public class ReferenceLink {

    private final String url;

    public ReferenceLink(final String url) {
        validate(url);
        this.url = url;
    }

    private void validate(final String url) {
        if (StringUtils.isBlank(url)) {
            throw new InvalidUrlFormatException("url이 비어있습니다.");
        }
    }
}
