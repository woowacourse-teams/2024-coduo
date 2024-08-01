package site.coduo.referencelink.domain;

import java.io.IOException;
import java.util.Objects;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import lombok.Getter;
import site.coduo.referencelink.exception.InvalidUrlFormatException;

@Getter
public class Url {

    private static final Pattern VALID_REGEX = Pattern.compile(
            "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)");

    private final String value;

    public Url(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new InvalidUrlFormatException("url이 비어있습니다.");
        }

        if (VALID_REGEX.matcher(value).matches()) {
            return;
        }
        throw new InvalidUrlFormatException("URL이 정해진 정규 표현식과 다릅니다.");
    }

    public Document getDocument() {
        try {
            return Jsoup.connect(value).get();
        } catch (IOException e) {
            return null;
        }
    }
}
