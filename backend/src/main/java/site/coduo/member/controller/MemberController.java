package site.coduo.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.auth.SignInCookie;
import site.coduo.member.service.dto.member.MemberReadResponse;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member")
    public ResponseEntity<MemberReadResponse> getMember(
            @CookieValue(SignInCookie.SIGN_IN_COOKIE_NAME) final String token
    ) {
        MemberReadResponse response = memberService.findMemberByCredential(token);

        return ResponseEntity.ok(response);
    }

}
