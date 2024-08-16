package site.coduo.referencelink.domain;

import java.io.IOException;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import lombok.Getter;
import site.coduo.referencelink.exception.DocumentAccessException;
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
            throw new InvalidUrlFormatException("URL 비어있습니다.");
        }

        if (VALID_REGEX.matcher(value).matches()) {
            return;
        }
        throw new InvalidUrlFormatException("URL이 정해진 정규 표현식과 다릅니다.");
    }

    public Document getDocument() {
        try {
            return Jsoup.connect(value).get();
        } catch (final IOException e) {
            throw new DocumentAccessException("URL에 대한 Document를 불러올 수 없습니다.");
        }
    }

    public String extractDomain() {
        final String regex = "^(?:https?://)?(?:www\\.)?([^:/\\s]+)";
        final Pattern pattern = Pattern.compile(regex);
        final Matcher matcher = pattern.matcher(value);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return OpenGraph.DEFAULT_VALUE;
        }
    }
}
