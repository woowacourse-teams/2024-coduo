package site.coduo.member.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.service.dto.member.MemberReadResponse;

@Tag(name = "회원 API")
public interface MemberControllerDocs {

    @Operation(summary = "회원이름 조회 요청한다.")
    @ApiResponse(responseCode = "200", description = "회원 정보를 조회한다.")
    @ApiResponse(responseCode = "403", description = "인가 실패",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<MemberReadResponse> getMember(String signInToken);
}
