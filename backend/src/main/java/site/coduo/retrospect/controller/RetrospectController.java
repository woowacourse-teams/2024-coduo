package site.coduo.retrospect.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.retrospect.controller.docs.RetrospectDocs;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.ExistRetrospectWithPairRoomResponse;
import site.coduo.retrospect.controller.response.FindRetrospectByIdResponse;
import site.coduo.retrospect.controller.response.FindRetrospectsResponse;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.service.RetrospectService;

@RequiredArgsConstructor
@RestController
public class RetrospectController implements RetrospectDocs {

    private final RetrospectService retrospectService;

    @PostMapping("/retrospects")
    public ResponseEntity<Void> createRetrospect(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @RequestBody CreateRetrospectRequest request
    ) {
        retrospectService.createRetrospect(credentialToken, request.pairRoomAccessCode(), request.answers());
        return ResponseEntity.created(URI.create("/")).build();
    }

    @GetMapping("/retrospects")
    public ResponseEntity<FindRetrospectsResponse> findRetrospects(@CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken) {
        final List<Retrospect> retrospects = retrospectService.findAllRetrospectsByMember(credentialToken);
        final FindRetrospectsResponse response = FindRetrospectsResponse.of(retrospects);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/retrospects/{retrospectId}")
    public ResponseEntity<FindRetrospectByIdResponse> findRetrospectById(@PathVariable("retrospectId") final Long retrospectId) {
        final Retrospect retrospect = retrospectService.findRetrospectById(retrospectId);
        final FindRetrospectByIdResponse response = FindRetrospectByIdResponse.from(retrospect);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/retrospects/{retrospectId}")
    public ResponseEntity<Void> deleteRetrospect(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @PathVariable("retrospectId") final Long retrospectId
    ) {
        retrospectService.deleteRetrospect(credentialToken, retrospectId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/member/retrospect/{accessCode}/exists")
    public ResponseEntity<ExistRetrospectWithPairRoomResponse> existRetrospectWithPairRoom(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String credentialToken,
            @PathVariable("accessCode") final String pairRoomAccessCode
    ) {
        final boolean existRetrospect = retrospectService.existRetrospectWithPairRoom(credentialToken, pairRoomAccessCode);
        final ExistRetrospectWithPairRoomResponse response = new ExistRetrospectWithPairRoomResponse(existRetrospect);
        return ResponseEntity.ok(response);
    }
}
