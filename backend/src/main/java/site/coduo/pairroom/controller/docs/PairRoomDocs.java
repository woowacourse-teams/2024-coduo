package site.coduo.pairroom.controller.docs;

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
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomReadRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.dto.PairRoomStatusUpdateRequest;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;

@Tag(name = "페어룸 API")
public interface PairRoomDocs {

    @Operation(summary = "페어룸과 해당 페어룸의 타이머 정보를 함께 조회한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 & 타이머 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = PairRoomReadResponse.class)))
    ResponseEntity<PairRoomReadResponse> getPairRoom(
            @Parameter(description = "페어룸 접근 코드", required = true)
            PairRoomReadRequest request
    );

    @Operation(summary = "페어룸을 생성한다.")
    @ApiResponse(responseCode = "201", description = "페어룸 저장 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = PairRoomCreateResponse.class)))
    ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Parameter(description = "페어 프로그래밍에 참여하는 드라이버 이름, 내비게이터 이름, 타이머 시간, 타이머 남은 시간", required = true)
            PairRoomCreateRequest pairRoomCreateRequest,
            @Parameter(description = "로그인 유저 토큰")
            String token
    );

    @Operation(summary = "드라이버 내비게이터 역할을 바꾼다.")
    @ApiResponse(responseCode = "204", description = "페어룸 역할 스왑 성공")
    ResponseEntity<Void> updatePairRole(
            @Parameter(description = "페어룸 접근 코드")
            String accessCode
    );

    @Operation(summary = "페어룸의 상태를 변경한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 상태 변경 성공")
    ResponseEntity<Void> updatePairRoomStatus(
            @Parameter(description = "페어룸 접근 코드", required = true)
            String accessCode,
            @Parameter(description = "변경할 페어룸 상태", required = true)
            PairRoomStatusUpdateRequest request
    );

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
