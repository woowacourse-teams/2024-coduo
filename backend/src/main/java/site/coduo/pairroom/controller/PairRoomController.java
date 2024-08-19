package site.coduo.pairroom.controller;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.controller.docs.PairRoomDocs;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomDeleteRequest;
import site.coduo.pairroom.service.dto.PairRoomReadRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomStatusUpdateRequest;

@RequiredArgsConstructor
@RestController
public class PairRoomController implements PairRoomDocs {

    private final PairRoomService pairRoomService;

    @PostMapping("/pair-room")
    public ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Valid @RequestBody final PairRoomCreateRequest request
    ) {
        final PairRoomCreateResponse response = new PairRoomCreateResponse(
                pairRoomService.save(request));

        return ResponseEntity.created(URI.create("/"))
                .body(response);
    }

    @PatchMapping("/pair-room/{accessCode}/status")
    public ResponseEntity<Void> updatePairRoomStatus(
        @PathVariable("accessCode") final String accessCode,
        @Valid @RequestBody final PairRoomStatusUpdateRequest request
    ) {
        pairRoomService.updatePairRoomStatus(accessCode, request.status());

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/pair-room/{accessCode}")
    public ResponseEntity<PairRoomReadResponse> getPairRoom(
            @Valid @PathVariable("accessCode") final PairRoomReadRequest request
    ) {
        final PairRoomReadResponse response = PairRoomReadResponse.from(
                pairRoomService.findByAccessCode(request.accessCode()));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/pair-room/{accessCode}")
    public ResponseEntity<Void> deletePairRoom(
            @Valid @PathVariable("accessCode") final PairRoomDeleteRequest request
    ) {
        pairRoomService.deletePairRoom(request.accessCode());

        return ResponseEntity.noContent()
                .build();
    }
}
