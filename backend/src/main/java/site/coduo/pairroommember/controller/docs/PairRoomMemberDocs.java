package site.coduo.pairroommember.controller.docs;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.pairroommember.service.dto.PairRoomMemberResponse;

@Tag(name = "자신의 페어룸 API")
public interface PairRoomMemberDocs {

    @Operation(summary = "자신의 페어룸을 조회한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = PairRoomMemberResponse.class)))
    ResponseEntity<List<PairRoomMemberResponse>> getPairRooms(
            @Parameter(
                    in = ParameterIn.COOKIE,
                    name = "coduo_whoami",
                    description = "사용자가 인증에 성공하면 서버에서 발급하는 쿠키",
                    schema = @Schema(type = "string"),
                    required = true
            )
            String signInToken);
}
