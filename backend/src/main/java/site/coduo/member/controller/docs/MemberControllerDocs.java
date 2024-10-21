package site.coduo.member.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.member.MemberExistsResponse;
import site.coduo.member.service.dto.member.MemberReadResponse;

@Tag(name = "회원 API")
public interface MemberControllerDocs {

    @ApiResponse(responseCode = "200", description = "회원 등록 정보를 조회한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = MemberReadResponse.class)))
    @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<MemberReadResponse> getMember(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "coduo_whoami",
                    description = "사용자가 인증에 성공하면 서버에서 발급하는 쿠키",
                    schema = @Schema(type = "string")
            )
            String token);

    @ApiResponse(responseCode = "204", description = "회원 정보를 삭제한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    ResponseEntity<Void> deleteMember(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "coduo_whoami",
                    description = "사용자가 인증에 성공하면 서버에서 발급하는 쿠키",
                    schema = @Schema(type = "string")
            ) String token);

    @ApiResponse(responseCode = "200", description = "회원 가입 정보를 조회한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = MemberExistsResponse.class)))
    ResponseEntity<MemberExistsResponse> existsMember(
            @Parameter(
                    in = ParameterIn.QUERY,
                    name = "user_id",
                    description = "조회할 회원의 ID",
                    required = true,
                    schema = @Schema(type = "string")
            )
            String userId);
}
