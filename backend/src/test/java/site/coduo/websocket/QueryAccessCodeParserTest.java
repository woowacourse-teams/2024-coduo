package site.coduo.websocket;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.net.URLEncoder;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import site.coduo.websocket.exception.EmptyQueryException;
import site.coduo.websocket.exception.NotFoundAccessCodeInQueryException;

class QueryAccessCodeParserTest {

    @DisplayName("query에서 accesscode를 추출한다.")
    @ParameterizedTest
    @CsvSource(value = {"user=ink&accesscode=abcde-&role=admin", "accesscode=abcde-",})
    void parseAccessCode(final String query) {
        final String accessCode = QueryAccessCodeParser.parse(query);
        assertThat(accessCode).isEqualTo("abcde-");
    }

    @DisplayName("인코딩된 query에서 accesscode를 추출한다.")
    @Test
    void parseEncodedAccessCode() {
        final String encode = URLEncoder.encode("abcde-");
        final String accessCode = QueryAccessCodeParser.parse("user=john&accesscode=" + encode);
        assertThat(accessCode).isEqualTo("abcde-");
    }

    @DisplayName("query가 비어있거나 null이면 예외가 발생한다.")
    @NullAndEmptySource
    @ParameterizedTest
    void throwExceptionWhenQueryIsEmptyOrNull(final String query) {
        assertThatThrownBy(() -> QueryAccessCodeParser.parse(query))
                .isExactlyInstanceOf(EmptyQueryException.class)
                .hasMessageContaining("쿼리가 존재하지 않습니다");
    }

    @DisplayName("accesscode가 비어있으면 예외가 발생한다.")
    @Test
    void throwExceptionWhenAccessCodeIsEmpty() {
        String query = "user=ink&accesscode=";
        assertThatThrownBy(() -> QueryAccessCodeParser.parse(query))
                .isExactlyInstanceOf(NotFoundAccessCodeInQueryException.class)
                .hasMessageContaining("쿼리에 액세스코드가 존재하지 않습니다.");
    }
}
