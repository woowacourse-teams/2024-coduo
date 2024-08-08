package site.coduo.pairroom.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroom.dto.PairRoomDeleteRequest;
import site.coduo.pairroom.dto.PairRoomExistRequest;
import site.coduo.pairroom.dto.PairRoomExistResponse;
import site.coduo.pairroom.dto.PairRoomReadRequest;
import site.coduo.pairroom.dto.PairRoomReadResponse;

@Tag(name = "페어룸 API")
public interface PairRoomDocs {

    @Operation(summary = "페어룸을 조회한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 조회 성공",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = PairRoomReadResponse.class)))
    @ApiResponse(responseCode = "404", description = "페어룸 조회 실패 - 페어룸 접근 코드가 존재하지 않음",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<PairRoomReadResponse> getPairRoom(
            @Parameter(description = "페어룸 접근 코드", required = true)
            PairRoomReadRequest accessCode
    );

    @Operation(summary = "페어룸을 생성한다.")
    @ApiResponse(responseCode = "201", description = "페어룸 생성 성공",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = PairRoomCreateResponse.class)))
    ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Parameter(description = "페어 프로그래밍에 참여하는 페어 A의 이름, 페어 B의 이름", required = true)
            PairRoomCreateRequest pairRoomCreateRequest);

    @Operation(summary = "페어룸이 존재하는지 확인한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 존재 여부 확인 성공",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = PairRoomExistResponse.class)))
    ResponseEntity<PairRoomExistResponse> existPairRoom(
            @Parameter(description = "페어룸 액세스 코드", required = true)
            PairRoomExistRequest request
    );

    @Operation(summary = "페어룸을 삭제한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 삭제 성공")
    @ApiResponse(responseCode = "404", description = "페어룸 삭제 실패")
    ResponseEntity<Void> deletePairRoom(
            @Parameter(description = "페어룸 접근 코드", required = true)
            PairRoomDeleteRequest request
    );
}
