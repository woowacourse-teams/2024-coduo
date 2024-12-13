package site.coduo.pairroom.domain;

import lombok.Getter;

@Getter
public class MissionUrl {

    private final String value;

    public MissionUrl(final String value) {
        this.value = value;
    }
}
