package site.coduo.timer.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import site.coduo.timer.service.dto.TimerStartResponse;
import site.coduo.timer.service.dto.TimerStatusResponse;
import site.coduo.websocket.stomp.StompSubscriptionService;

@RequiredArgsConstructor
@Component
public class TimerStompManager {

    private static final String STATUS_DESTINATION = "/topic/%s/timer/status";
    private static final String TIME_DESTINATION = "/topic/%s/timer";

    private final StompSubscriptionService stompSubscriptionService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void send(final String accessCode, final TimerStatusResponse payload) {
        simpMessagingTemplate.convertAndSend(String.format(STATUS_DESTINATION, accessCode), payload);
    }

    public void send(final String accessCode, final TimerStartResponse payload) {
        simpMessagingTemplate.convertAndSend(String.format(TIME_DESTINATION, accessCode), payload);
    }

    public boolean isTimerIdle(final String accessCode) {
        return stompSubscriptionService.hasSubscription(String.format(TIME_DESTINATION, accessCode));
    }
}
