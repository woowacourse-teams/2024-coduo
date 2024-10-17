package site.coduo.retrospect.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
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
}
