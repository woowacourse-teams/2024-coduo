package site.coduo.timer.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.timer.controller.docs.TimerDocs;
import site.coduo.timer.service.TimerService;
import site.coduo.timer.service.dto.TimerDurationUpdateRequest;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerRemainingTimeUpdateRequest;

@RequiredArgsConstructor
@RestController
public class TimerController implements TimerDocs {

    private final TimerService timerService;

    @PostMapping("/{accessCode}/timer/start")
    public ResponseEntity<Void> createTimerStart(@PathVariable("accessCode") final String accessCode) {
        timerService.startTimer(accessCode);

        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/{accessCode}/timer/stop")
    public ResponseEntity<Void> createTimerStop(@PathVariable("accessCode") final String accessCode) {
        timerService.stopTimer(accessCode);

        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer/remaining-time")
    public ResponseEntity<Void> updateTimerRemainingTime(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final TimerRemainingTimeUpdateRequest request
    ) {
        timerService.updateTimerRemainingTime(accessCode, request.remainingTime());

        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer/duration")
    public ResponseEntity<Void> updateTimerDuration(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final TimerDurationUpdateRequest request
    ) {
        timerService.updateTimerDuration(accessCode, request.duration());

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
}
