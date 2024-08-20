package site.coduo.member.controller;

import static site.coduo.common.config.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.member.controller.docs.MemberControllerDocs;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.member.MemberReadResponse;

@RequiredArgsConstructor
@RestController
public class MemberController implements MemberControllerDocs {

    private final MemberService memberService;

    @GetMapping("/member")
    public ResponseEntity<MemberReadResponse> getMember(
            @CookieValue(SIGN_IN_COOKIE_NAME) final String token
    ) {
        final MemberReadResponse response = memberService.findMemberByCredential(token);

        return ResponseEntity.ok(response);
    }
}
