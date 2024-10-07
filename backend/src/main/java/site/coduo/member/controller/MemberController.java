package site.coduo.member.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

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
            @CookieValue(value = SIGN_IN_COOKIE_NAME, required = false) final String token
    ) {
        final MemberReadResponse response = new MemberReadResponse("자기");

        return ResponseEntity.ok(response);
    }
}
