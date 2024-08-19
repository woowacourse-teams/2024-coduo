package site.coduo.member.controller.docs;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.oauth.GithubOAuthEndpoint;

@Tag(name = "깃허브 OAuth API")
public interface GithubOAuthControllerDocs {

    @ApiResponse(responseCode = "302", description = "회원 정보(유저이름)을 등록한다.", content
            = @Content(schema = @Schema(contentMediaType = MediaType.APPLICATION_JSON_VALUE)))
    @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<GithubOAuthEndpoint> getGithubAuthCode(HttpSession session);
}
