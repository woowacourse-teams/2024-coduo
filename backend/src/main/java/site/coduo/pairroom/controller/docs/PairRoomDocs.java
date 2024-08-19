package site.coduo.pairroom.controller.docs;

import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomDeleteRequest;
import site.coduo.pairroom.service.dto.PairRoomReadRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.dto.PairRoomStatusUpdateRequest;

@Tag(name = "페어룸 API")
public interface PairRoomDocs {

    @Operation(summary = "페어룸을 조회한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 조회 성공")
    ResponseEntity<PairRoomReadResponse> getPairRoom(
            @Parameter(description = "페어룸 접근 코드", required = true)
            PairRoomReadRequest request
    );

    @Operation(summary = "페어룸을 생성한다.")
    @ApiResponse(responseCode = "201", description = "타이머 시간 저장 성공")
    ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Parameter(description = "페어 프로그래밍에 참여하는 페어 A의 이름, 페어 B의 이름", required = true)
            PairRoomCreateRequest pairRoomCreateRequest
    );

    @Operation(summary = "페어룸의 상태를 변경한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 상태 변경 성공")
    ResponseEntity<Void> updatePairRoomStatus(
            @Parameter(description = "페어룸 접근 코드", required = true)
            String accessCode,
            @Parameter(description = "변경할 페어룸 상태", required = true)
            PairRoomStatusUpdateRequest request
    );

    @Operation(summary = "페어룸을 삭제한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 삭제 성공")
    @ApiResponse(responseCode = "404", description = "페어룸 삭제 실패")
    ResponseEntity<Void> deletePairRoom(
            @Parameter(description = "페어룸 접근 코드", required = true) PairRoomDeleteRequest request
    );
}
