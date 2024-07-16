package site.coduo.pairroom.controller.docs;

import org.springframework.http.MediaType;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.pairroom.dto.CreatePairRoom;
import site.coduo.pairroom.dto.PairRoomRequest;
import site.coduo.pairroom.dto.PairRoomResponse;
import site.coduo.pairroom.dto.ReadPairRoom;

@Tag(name = "페어룸 API")
public interface PairRoomDocs {

    @Operation(summary = "페어룸을 불러온다.")
    @ApiResponse(responseCode = "200", description = "페어룸 조회 성공",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ReadPairRoom.class)))
    @ApiResponse(responseCode = "404", description = "페어룸 조회 실패 - 페어룸 접근 코드가 존재하지 않음",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ReadPairRoom getPairRoom(@Parameter(description = "페어룸 접근 코드", required = true) PairRoomRequest accessCode);

    @Operation(summary = "페어룸을 생성한다.")
    @ApiResponse(responseCode = "201", description = "페어룸 생성 성공",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = PairRoomResponse.class)))
    PairRoomResponse createPairRoom(@Parameter(description = "페어 프로그래밍에 참여하는 페어 A의 이름, 페어 B의 이름", required = true)
                                    CreatePairRoom createPairRoom);
}
