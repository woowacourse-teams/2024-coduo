package site.coduo.pairroom.controller.docs;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroom.dto.PairRoomDeleteRequest;
import site.coduo.pairroom.dto.PairRoomReadRequest;
import site.coduo.pairroom.dto.PairRoomReadResponse;
import site.coduo.pairroom.dto.TimerDurationCreateRequest;


@Tag(name = "페어룸 API")
public interface PairRoomDocs {


    ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Parameter(description = "페어 프로그래밍에 참여하는 페어 A의 이름, 페어 B의 이름", required = true)
            PairRoomCreateRequest pairRoomCreateRequest);

    @Operation(summary = "타이머 시간을 저장한다.")
    @ApiResponse(responseCode = "201", description = "타이머 시간 저장 성공")
    ResponseEntity<Void> createTimerDuration(
            @Parameter(description = "페어룸 접근 코드", required = true)
            @PathVariable("accessCode") final String accessCode,

            @Parameter(description = "타이머 시간 저장 요청 바디", required = true)
            @RequestBody final TimerDurationCreateRequest request
    );

    @Operation(summary = "페어룸을 삭제한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 삭제 성공")
    @ApiResponse(responseCode = "404", description = "페어룸 삭제 실패")
    ResponseEntity<Void> deletePairRoom(@Parameter(description = "페어룸 접근 코드") PairRoomDeleteRequest request);
}
