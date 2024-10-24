package site.coduo.retrospect.domain;

import java.util.Objects;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Retrospect {

    private final RetrospectContents contents;

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final Retrospect that)) {
            return false;
        }
        return Objects.equals(getContents(), that.getContents());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getContents());
    }
}
