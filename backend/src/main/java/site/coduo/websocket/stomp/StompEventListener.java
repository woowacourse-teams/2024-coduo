package site.coduo.websocket.stomp;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import lombok.RequiredArgsConstructor;
import site.coduo.sync.service.SchedulerService;

@Component
@RequiredArgsConstructor
public class StompEventListener {

    private final SchedulerService schedulerService;

    @EventListener
    public void onSubscription(final SessionSubscribeEvent event) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String id = (String) headerAccessor.getHeader(SimpMessageHeaderAccessor.SUBSCRIPTION_ID_HEADER);
        schedulerService.notifyTimerStatus(id);
    }

    @EventListener
    public void onUnSubscription(final SessionUnsubscribeEvent event) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String id = (String) headerAccessor.getHeader(SimpMessageHeaderAccessor.SUBSCRIPTION_ID_HEADER);
        schedulerService.syncTimerWithDatabase(id);
    }
}
