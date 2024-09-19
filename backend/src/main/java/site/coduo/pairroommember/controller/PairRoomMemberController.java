package site.coduo.pairroommember.controller;

import static site.coduo.common.config.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroommember.service.dto.PairRoomMemberResponse;
import site.coduo.pairroommember.service.PairRoomMemberService;

@RestController
@RequiredArgsConstructor
public class PairRoomMemberController {

    private final PairRoomMemberService pairRoomMemberService;

    @GetMapping("/my-pair-rooms")
    public ResponseEntity<List<PairRoomMemberResponse>> getPairRooms(@CookieValue(SIGN_IN_COOKIE_NAME) String token) {
        final List<PairRoomMemberResponse> pairRooms = pairRoomMemberService.findPairRooms(token);

        return ResponseEntity.ok()
                .body(pairRooms);
    }
}
