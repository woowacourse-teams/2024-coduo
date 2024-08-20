package site.coduo.member.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.auth.SignInWebResponse;
import site.coduo.member.service.dto.auth.SignUpRequest;

@Tag(name = "인증/인가 API")
public interface AuthControllerDocs {

    ResponseEntity<Void> signOut(String signInToken);

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
    ResponseEntity<Void> signUp(SignUpRequest request, String accessToken);


}
