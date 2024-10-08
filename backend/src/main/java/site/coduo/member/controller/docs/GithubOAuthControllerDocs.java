package site.coduo.member.controller.docs;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.oauth.GithubCallbackQuery;

@Tag(name = "깃허브 OAuth API")
public interface GithubOAuthControllerDocs {

    @Operation(summary = "깃허브 인가엔드 포인트 URI 호출",
            responses = {
                    @ApiResponse(responseCode = "307", description = "깃허브 측 인가 엔드 포인트로 redirect"),
                    @ApiResponse(responseCode = "401", description = "인증 실패",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    ResponseEntity<Void> getGithubAuthCode(@Parameter(hidden = true) HttpSession session);

    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> getAccessToken(
            GithubCallbackQuery query,
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "JSESSIONID",
                    description = "OAuth 인가 과정에서 사용자 세션을 유지하기 위한 쿠키",
                    schema = @Schema(type = "string")
            ) HttpSession session);
}
