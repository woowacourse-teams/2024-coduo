package site.coduo.member.controller;

import static site.coduo.member.controller.GithubOAuthController.ACCESS_TOKEN_SESSION_NAME;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import site.coduo.member.controller.dto.member.MemberCreateWebRequest;
import site.coduo.member.service.MemberService;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final MemberCreateWebRequest request,
                                       @SessionAttribute(ACCESS_TOKEN_SESSION_NAME) final String accessToken) {
        memberService.createMember(request.toServiceRequest(accessToken));

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }
}
