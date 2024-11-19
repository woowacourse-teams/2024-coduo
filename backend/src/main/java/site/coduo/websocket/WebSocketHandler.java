package site.coduo.websocket;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final PairRoomWebSocketSessionStore pairRoomWebSocketSessionStore;

    @Override
    public void afterConnectionEstablished(final WebSocketSession session) {
        final String query = session.getUri().getQuery();
        final String pairRoomAccessCode = parsePairRoomAccessCode(query);
        pairRoomWebSocketSessionStore.addSession(pairRoomAccessCode, session);
        log.info("연결 성공 : {}", session.getId());
    }

    // TODO : 솔직히 이건 좀 아니지 얂냐... 개선하자 우테코 나왔으면 켈리야..
    private String parsePairRoomAccessCode(final String query) {
        if (query == null || query.isEmpty()) {
            throw new IllegalArgumentException("Web Socket 연결 uri에 페어룸 Access Code가 존재하지 않습니다.");
        }

        if (query != null) {
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                int idx = pair.indexOf("=");
                String key = idx > 0 ? URLDecoder.decode(pair.substring(0, idx), StandardCharsets.UTF_8) : pair;
                if ("accesscode".equals(key)) {
                    return URLDecoder.decode(pair.substring(idx + 1), StandardCharsets.UTF_8);
                }
            }
        }
        return null; // 또는 기본값 설정
    }

    @Override
    protected void handleTextMessage(final WebSocketSession session, final TextMessage message) {
        // TODO : 클라이언트의 메시지를 파싱하는 메서드. 타이머 잔여 시간 조회에 필요가 없어 우선 보류
    }

    @Override
    public void handleTransportError(final WebSocketSession session, final Throwable exception) {
        log.error("Web Socket 전송 중 에러 발생 : {}", exception.getMessage());
    }

    @Override
    public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) {
        log.info("연결 종료 : {}, 상태 : {}", session.getId(), status);
    }
}
