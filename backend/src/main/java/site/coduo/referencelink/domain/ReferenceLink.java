package site.coduo.referencelink.domain;

import java.net.URL;

import lombok.Getter;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
public class ReferenceLink {

    private final URL url;
    private final AccessCode accessCode;

    public ReferenceLink(final URL url, final AccessCode accessCode) {
        this.url = url;
        this.accessCode = accessCode;
    }

    public String getUrlText() {
        return url.toExternalForm();
    }
}
