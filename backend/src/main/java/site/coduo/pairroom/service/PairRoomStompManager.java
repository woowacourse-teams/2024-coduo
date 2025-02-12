package site.coduo.pairroom.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomStatusResponse;

@RequiredArgsConstructor
@Component
public class PairRoomStompManager {

    private static final String STATUS_DESTINATION = "/topic/%s/pair-room/status";

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void send(final String accessCode, final PairRoomStatus pairRoomStatus) {
        simpMessagingTemplate.convertAndSend(
                String.format(STATUS_DESTINATION, accessCode),
                new PairRoomStatusResponse(pairRoomStatus.getName())
        );
    }
}
