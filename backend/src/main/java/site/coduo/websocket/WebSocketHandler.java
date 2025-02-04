package site.coduo.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.sync.service.SchedulerService;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final PairRoomWebSocketSessionStore pairRoomWebSocketSessionStore;
    private final SchedulerService schedulerService;

    @Override
    public void afterConnectionEstablished(final WebSocketSession session) {
        final String pairRoomAccessCode = parsePairRoomAccessCode(session);
        pairRoomWebSocketSessionStore.addSession(pairRoomAccessCode, session);
        schedulerService.notifyTimerStatus(pairRoomAccessCode);
        log.info("연결 성공 : {}", session.getId());
    }

    private String parsePairRoomAccessCode(final WebSocketSession session) {
        final String query = session.getUri().getQuery();
        return QueryAccessCodeParser.parse(query);
    }

    @Override
    protected void handleTextMessage(final WebSocketSession session, final TextMessage message) {
        // TODO : 클라이언트의 메시지를 파싱하는 메서드. 타이머 잔여 시간 조회에 필요가 없어 우선 보류
    }

    @Override
    public void handleTransportError(final WebSocketSession session, final Throwable exception) {
        final String pairRoomAccessCode = parsePairRoomAccessCode(session);
        schedulerService.syncTimerWithDatabase(pairRoomAccessCode);
        log.error("Web Socket 전송 중 에러 발생 : {}", exception.getMessage());
    }

    @Override
    public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) {
        final String pairRoomAccessCode = parsePairRoomAccessCode(session);
        schedulerService.syncTimerWithDatabase(pairRoomAccessCode);
        pairRoomWebSocketSessionStore.removeSession(pairRoomAccessCode, session);
        log.info("연결 종료 : {}, 상태 : {}", session.getId(), status);
    }
}
