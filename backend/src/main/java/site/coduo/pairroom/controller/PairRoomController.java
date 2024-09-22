package site.coduo.pairroom.controller;

import static site.coduo.common.config.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.controller.docs.PairRoomDocs;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomReadRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.dto.PairRoomStatusUpdateRequest;

@RequiredArgsConstructor
@RestController
public class PairRoomController implements PairRoomDocs {

    private final PairRoomService pairRoomService;

    @PostMapping("/pair-room")
    public ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Valid @RequestBody final PairRoomCreateRequest request,
            @CookieValue(value = SIGN_IN_COOKIE_NAME, required = false) String token
    ) {
        final PairRoomCreateResponse response = savePairRoom(request, token);

        return ResponseEntity.created(URI.create("/"))
                .body(response);
    }

    private PairRoomCreateResponse savePairRoom(final PairRoomCreateRequest request, final String token) {
        if (token != null) {
            return new PairRoomCreateResponse(pairRoomService.saveMemberPairRoom(request, token));
        }

        return new PairRoomCreateResponse(pairRoomService.saveNonMemberPairRoom(request));
    }

    @PatchMapping("/pair-room/{accessCode}/pair-swap")
    public ResponseEntity<Void> updatePairRole(@PathVariable("accessCode") final String accessCode) {
        pairRoomService.updateNavigatorWithDriver(accessCode);

        return ResponseEntity.noContent()
                .build();
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
        final PairRoomReadResponse response = pairRoomService.findByAccessCode(request.accessCode());

        return ResponseEntity.ok(response);
    }
}
