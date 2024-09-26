package site.coduo.timer.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.sync.service.SchedulerService;
import site.coduo.timer.controller.docs.TimerDocs;
import site.coduo.timer.service.TimerService;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;

@RequiredArgsConstructor
@RestController
public class TimerController implements TimerDocs {

    private final TimerService timerService;
    private final SchedulerService schedulerService;

    @PatchMapping("/{accessCode}/timer/start")
    public ResponseEntity<Void> createTimerStart(@PathVariable("accessCode") final String accessCode) {
        schedulerService.start(accessCode);

        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer/stop")
    public ResponseEntity<Void> createTimerStop(@PathVariable("accessCode") final String accessCode) {
        schedulerService.stop(accessCode);

        return ResponseEntity.noContent()
                .build();
    }

    @PatchMapping("/{accessCode}/timer")
    public ResponseEntity<Void> updateTimer(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final TimerUpdateRequest request
    ) {
        timerService.updateTimer(accessCode, request);

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
