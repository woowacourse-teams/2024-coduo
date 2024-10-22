package site.coduo.member.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.auth.SignInCheckResponse;
import site.coduo.member.service.dto.auth.SignInWebResponse;
import site.coduo.member.service.dto.auth.SignUpRequest;

@Tag(name = "인증/인가 API")
public interface AuthControllerDocs {

    @Operation(summary = "로그아웃 요청을 한다.")
    @ApiResponse(responseCode = "200", description = "로그아웃 요청 성공.")
    @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> signOut(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "coduo_whoami",
                    description = "사용자가 인증에 성공하면 서버에서 발급하는 쿠키",
                    schema = @Schema(type = "string")
            )
            String signInToken);

    @Operation(summary = "회원가입 요청한다.",
            requestBody = @RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = SignInWebResponse.class)
                    )
            )
    )
    @ApiResponse(responseCode = "302", description = "회원 정보(유저이름)을 등록한다.", content
            = @Content(schema = @Schema(contentMediaType = MediaType.APPLICATION_JSON_VALUE)))
    @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> signUp(
            @Parameter(description = "회원 정보", required = true)
            SignUpRequest request,

            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "JSESSIONID",
                    description = "OAuth 인가 과정에서 사용자 세션을 유지하기 위한 쿠키",
                    schema = @Schema(type = "string")
            )
            String accessToken);

    @Operation(summary = "로그인 상태를 확인한다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "로그인 시 예시",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignInCheckResponse.class))),
                    @ApiResponse(responseCode = "401", description = "인증 실패",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    ResponseEntity<SignInCheckResponse> signInCheck(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "coduo_whoami",
                    description = "사용자가 인증에 성공하면 서버에서 발급하는 쿠키",
                    schema = @Schema(type = "string")
            )
            String signInToken);

    @Operation(summary = "로그인 인증 요청 콜백",
            responses = {
                    @ApiResponse(responseCode = "200", description = "인증에 성공하면 쿠키를 발급한다.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignInWebResponse.class))),
                    @ApiResponse(responseCode = "401", description = "인증 실패",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiErrorResponse.class)))
            }
    )
    ResponseEntity<SignInWebResponse> signInCallback(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "JSESSIONID",
                    description = "OAuth 인가 과정에서 사용자 세션을 유지하기 위한 쿠키",
                    schema = @Schema(type = "string")
            )
            String accessToken);
}
