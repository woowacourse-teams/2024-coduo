package site.coduo.pairroomhistory.controller;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroomhistory.controller.docs.PairRoomHistoryDocs;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryReadResponse;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryUpdateRequest;
import site.coduo.pairroomhistory.service.PairRoomHistoryService;

@RequiredArgsConstructor
@RestController
public class PairRoomHistoryController implements PairRoomHistoryDocs {

    private final PairRoomHistoryService pairRoomHistoryService;

    @PostMapping("/{accessCode}/history")
    public ResponseEntity<Void> createPairRoomHistory(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final PairRoomHistoryCreateRequest request
    ) {
        pairRoomHistoryService.createPairRoomHistory(accessCode, request);

        return ResponseEntity.created(URI.create("/"))
                .build();
    }

    @PatchMapping("/{accessCode}/history/latest/timer-remaining-time")
    public ResponseEntity<Void> updateTimerRemainingTime(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final PairRoomHistoryUpdateRequest request
    ) {
        pairRoomHistoryService.updateTimerRemainingTimeHistory(accessCode, request);

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/{accessCode}/history/latest")
    public ResponseEntity<PairRoomHistoryReadResponse> getPairRoomHistory(
            @PathVariable("accessCode") final String accessCode
    ) {
        final PairRoomHistoryReadResponse response = pairRoomHistoryService.readLatestPairRoomHistory(accessCode);

        return ResponseEntity.ok(response);
    }
}
