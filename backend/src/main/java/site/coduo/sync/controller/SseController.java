package site.coduo.sync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import site.coduo.sync.controller.docs.SseDocs;
import site.coduo.sync.service.SseService;
import site.coduo.timer.service.TimerService;


@RequiredArgsConstructor
@RestController
public class SseController implements SseDocs {

    private final SseService sseService;
    private final TimerService timerService;

    @GetMapping("/{key}/connect")
    public ResponseEntity<SseEmitter> createConnection(@PathVariable("key") final String key) {
        final SseEmitter sseEmitter = sseService.connect(key);
        // todo 추후 리팩토링
        final long remainingTime = timerService.readTimerRemainingTime(key);
        sseService.broadcast(key, "remaining-time", String.valueOf(remainingTime));

        return ResponseEntity.ok(sseEmitter);
    }

    @DeleteMapping("/{key}/connect")
    public ResponseEntity<Void> deleteConnection(@PathVariable("key") final String key) {
        sseService.disconnectAll(key);

        return ResponseEntity.noContent()
                .build();
    }
}
