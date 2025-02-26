package site.coduo.websocket.stomp;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import lombok.RequiredArgsConstructor;
import site.coduo.timer.service.SchedulerService;
import site.coduo.timer.service.TimerStompManager;
import site.coduo.websocket.exception.NotFoundAccessCodeInQueryException;

@Component
@RequiredArgsConstructor
public class StompEventListener {

    private static final int DESTINATION_PREFIX_LENGTH = "/topic/".length();
    private static final String PATH = "/";

    private final SchedulerService schedulerService;
    private final TimerStompManager timerStompManager;

    @EventListener
    public void onSubscription(final SessionSubscribeEvent event) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String destination = (String) headerAccessor.getHeader(SimpMessageHeaderAccessor.DESTINATION_HEADER);
        if (destination == null) {
            throw new NotFoundAccessCodeInQueryException("STOMP 헤더에 simpDestination이 존재하지 않습니다.");
        }
        final String key = parsePairRoomKey(destination);
        if (timerStompManager.isTimerStatusDestination(key, destination)) {
            schedulerService.notifyTimerStatus(key);
        }
    }

    @EventListener
    public void onUnSubscription(final SessionUnsubscribeEvent event) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String destination = (String) headerAccessor.getHeader(SimpMessageHeaderAccessor.SUBSCRIPTION_ID_HEADER);
        if (destination == null) {
            throw new NotFoundAccessCodeInQueryException("STOMP 헤더에 simpSubscriptionId가 존재하지 않습니다.");
        }
        final String key = parsePairRoomKey(destination);
        if (timerStompManager.isTimerStatusDestination(key, destination)) {
            schedulerService.syncTimerWithDatabase(key);
        }
    }

    private String parsePairRoomKey(final String destination) {
        final int endIndex = destination.indexOf(PATH, DESTINATION_PREFIX_LENGTH);
        if (endIndex == -1) {
            throw new NotFoundAccessCodeInQueryException("STOMP subscribe의 destination에서 accessCode를 파싱할 수 없습니다.");
        }
        return destination.substring(DESTINATION_PREFIX_LENGTH, endIndex);
    }
}
