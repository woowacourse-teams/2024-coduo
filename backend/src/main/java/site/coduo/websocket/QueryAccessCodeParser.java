package site.coduo.websocket;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import site.coduo.websocket.exception.EmptyQueryException;
import site.coduo.websocket.exception.NotFoundAccessCodeInQueryException;

public class QueryAccessCodeParser {

    private static final String QUERY_DELIMITER = "&";
    private static final String KEY_VALUE_DELIMITER = "=";
    private static final int ACCESS_CODE_QUERY_SIZE = 2;
    private static final int KEY_INDEX = 0;
    private static final String ACCESS_CODE_KEY_NAME = "accesscode";
    private static final int VALUE_INDEX = 1;

    public static String parse(final String query) {
        validateQuery(query);
        return Arrays.stream(query.split(QUERY_DELIMITER))
                .map(keyValuePair -> keyValuePair.split(KEY_VALUE_DELIMITER))
                .filter(QueryAccessCodeParser::isAccessCodeKeyValuePair)
                .findFirst()
                .map(accessCodeKeyValue -> URLDecoder.decode(accessCodeKeyValue[VALUE_INDEX], StandardCharsets.UTF_8))
                .orElseThrow(() -> new NotFoundAccessCodeInQueryException("쿼리에 액세스코드가 존재하지 않습니다."));
    }

    private static void validateQuery(final String query) {
        if (query == null || query.isEmpty()) {
            throw new EmptyQueryException("쿼리가 존재하지 않습니다.");
        }
    }

    private static boolean isAccessCodeKeyValuePair(final String[] keyValuePair) {
        return keyValuePair.length == ACCESS_CODE_QUERY_SIZE && keyValuePair[KEY_INDEX].equals(ACCESS_CODE_KEY_NAME);
    }
}
