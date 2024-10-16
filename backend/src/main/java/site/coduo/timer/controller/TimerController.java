package site.coduo.timer.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.sync.service.SchedulerService;
import site.coduo.sync.service.SseService;
import site.coduo.timer.controller.docs.TimerDocs;
import site.coduo.timer.service.TimerService;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TimerController implements TimerDocs {

    private final TimerService timerService;
    private final SchedulerService schedulerService;
    private final SseService sseService;

    @PatchMapping("/{accessCode}/timer/start")
    public ResponseEntity<Void> createTimerStart(@PathVariable("accessCode") final String accessCode) {
        schedulerService.start(accessCode);
        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer/stop")
    public ResponseEntity<Void> createTimerStop(@PathVariable("accessCode") final String accessCode) {
        schedulerService.pause(accessCode);

        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer")
    public ResponseEntity<Void> updateTimer(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final TimerUpdateRequest request
    ) {
        timerService.updateTimer(accessCode, request);
        sseService.broadcast(accessCode, "timer", "update");

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/{accessCode}/timer")
    public ResponseEntity<TimerReadResponse> getTimer(
            @PathVariable("accessCode") final String accessCode
    ) {
        final TimerReadResponse response = timerService.readTimer(accessCode);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{accessCode}/timer/disable")
    public ResponseEntity<Void> disableTimer(
            @PathVariable("accessCode") final String accessCode,
            @CookieValue(name = SIGN_IN_COOKIE_NAME) final String signInToken
    ) {
        schedulerService.detach(accessCode, signInToken);

        return ResponseEntity.ok()
                .build();
    }
}
