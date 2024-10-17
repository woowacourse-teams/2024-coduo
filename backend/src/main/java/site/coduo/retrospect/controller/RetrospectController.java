package site.coduo.retrospect.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.FindRetrospectsResponse;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.service.RetrospectService;

@RequiredArgsConstructor
@RestController
public class RetrospectController {

    private final RetrospectService retrospectService;

    @PostMapping("/retrospects")
    public ResponseEntity<Void> createRetrospect(
            @CookieValue("coduo_whoami") final String credentialToken,
            @RequestBody CreateRetrospectRequest request
    ) {
        retrospectService.createRetrospect(credentialToken, request.pairRoomAccessCode(), request.answers());
        return ResponseEntity.created(URI.create("/")).build();
    }

    @GetMapping("/retrospects")
    public ResponseEntity<FindRetrospectsResponse> findRetrospects(@CookieValue("coduo_whoami") final String credentialToken) {
        final List<Retrospect> retrospects = retrospectService.findAllRetrospectsByMember(credentialToken);
        final FindRetrospectsResponse response = FindRetrospectsResponse.of(retrospects);
        return ResponseEntity.ok(response);
    }
}
