package site.coduo.pairroom.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.net.URI;
import java.util.List;

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
import lombok.extern.slf4j.Slf4j;
import site.coduo.pairroom.controller.docs.PairRoomDocs;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;
import site.coduo.pairroom.service.dto.PairRoomReadRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.dto.PairRoomStatusUpdateRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PairRoomController implements PairRoomDocs {

    private final PairRoomService pairRoomService;

    @PostMapping("/pair-room")
    public ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Valid @RequestBody final PairRoomCreateRequest request,
            @CookieValue(value = SIGN_IN_COOKIE_NAME, required = false) final String token
    ) {
        log.info("1. 일단 Pair Room 생성 POST 요청이 들어와서 Controller가 받았다.");
        final String accessCode = pairRoomService.savePairRoom(request, token);
        log.info("12. 페어룸 서비스 탈출!!!!");
        final PairRoomCreateResponse response = new PairRoomCreateResponse(accessCode);

        log.info("13. 최종 응답 보내기 시작!!");
        return ResponseEntity.created(URI.create("/"))
                .body(response);
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
        final PairRoomReadResponse response = pairRoomService.findPairRoomAndTimer(request.accessCode());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-pair-rooms")
    public ResponseEntity<List<PairRoomMemberResponse>> getPairRooms(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String token
    ) {
        final List<PairRoomMemberResponse> pairRooms = pairRoomService.findPairRooms(token);

        return ResponseEntity.ok()
                .body(pairRooms);
    }
}
