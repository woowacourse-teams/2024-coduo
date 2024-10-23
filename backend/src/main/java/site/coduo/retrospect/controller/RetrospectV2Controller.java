package site.coduo.retrospect.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.retrospect.controller.docs.RetrospectV2Docs;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.ExistRetrospectWithPairRoomResponse;
import site.coduo.retrospect.controller.response.FindRetrospectByIdResponseV2;
import site.coduo.retrospect.controller.response.FindRetrospectsResponseV2;
import site.coduo.retrospect.domain.RetrospectV2;
import site.coduo.retrospect.service.RetrospectService;

@RequiredArgsConstructor
@RestController
public class RetrospectV2Controller implements RetrospectV2Docs {

    private final RetrospectService retrospectService;

    @PostMapping("/retrospects")
    public ResponseEntity<Void> createRetrospect(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @RequestBody CreateRetrospectRequest request
    ) {
        retrospectService.createRetrospect(credentialToken, request.accessCode(), request.answers());
        return ResponseEntity.created(URI.create("/")).build();
    }

    @GetMapping("/retrospects")
    public ResponseEntity<FindRetrospectsResponseV2> findRetrospects(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken) {
        final FindRetrospectsResponseV2 response = retrospectService.findAllRetrospectsByMember(credentialToken);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/retrospects/{accessCode}")
    public ResponseEntity<FindRetrospectByIdResponseV2> getRetrospect(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @PathVariable("accessCode") final String accessCode) {
        final RetrospectV2 retrospect = retrospectService.findRetrospectByAccessCode(credentialToken, accessCode);
        final FindRetrospectByIdResponseV2 response = FindRetrospectByIdResponseV2.from(retrospect);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/retrospects/{accessCode}")
    public ResponseEntity<Void> deleteRetrospect(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @PathVariable("accessCode") final String accessCode
    ) {
        retrospectService.deleteRetrospect(credentialToken, accessCode);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/member/retrospect/{accessCode}/exists")
    public ResponseEntity<ExistRetrospectWithPairRoomResponse> existRetrospectWithPairRoom(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @PathVariable("accessCode") final String pairRoomAccessCode
    ) {
        final boolean existRetrospect = retrospectService.existRetrospectWithPairRoom(credentialToken,
                pairRoomAccessCode);
        final ExistRetrospectWithPairRoomResponse response = new ExistRetrospectWithPairRoomResponse(existRetrospect);
        return ResponseEntity.ok(response);
    }
}
