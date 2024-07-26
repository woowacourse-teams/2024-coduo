package site.coduo.referencelink.domain;

import lombok.Getter;
import site.coduo.pairroom.domain.AccessCode;

@Getter
public class ReferenceLink {

    private final Url url;
    private final AccessCode accessCode;

    public ReferenceLink(final Url url, final AccessCode accessCode) {
        this.url = url;
        this.accessCode = accessCode;
    }

    public String getUrlText() {
        return url.getValue();
    }
}
