package site.coduo.member.controller;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.member.controller.docs.MemberControllerDocs;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.member.MemberExistsResponse;
import site.coduo.member.service.dto.member.MemberReadResponse;

@RequiredArgsConstructor
@RestController
public class MemberController implements MemberControllerDocs {

    private final MemberService memberService;

    @GetMapping("/member")
    public ResponseEntity<MemberReadResponse> getMember(@CookieValue(SIGN_IN_COOKIE_NAME) final String token) {
        final MemberReadResponse response = memberService.findMemberNameByCredential(token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/member/exists")
    public ResponseEntity<MemberExistsResponse> existsMember(@RequestParam("user_id") String userId) {
        final boolean existsMember = memberService.existsMember(userId);
        final MemberExistsResponse response = new MemberExistsResponse(existsMember);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/member")
    public ResponseEntity<Void> deleteMember(@CookieValue(SIGN_IN_COOKIE_NAME) final String token) {
        memberService.deleteMember(token);

        return ResponseEntity.noContent()
                .build();
    }
}
