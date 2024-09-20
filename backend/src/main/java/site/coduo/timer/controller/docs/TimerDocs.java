package site.coduo.timer.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.timer.service.dto.TimerDurationUpdateRequest;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerRemainingTimeUpdateRequest;

@Tag(name = "타이머 API")
public interface TimerDocs {

    @Operation(summary = "타이머를 시작한다.")
    @ApiResponse(responseCode = "204", description = "타이머 시작 성공")
    @ApiResponse(responseCode = "4xx", description = "페어룸 시작 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> createTimerStart(String accessCode);

    @Operation(summary = "타이머를 중지한다.")
    @ApiResponse(responseCode = "204", description = "타이머 즁자 성공")
    @ApiResponse(responseCode = "4xx", description = "페어룸 중지 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> createTimerStop(String accessCode);

    @Operation(summary = "타이머 남은 시간을 업데이트한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 히스토리 타이머 남은 시간 업데이트 성공")
    @ApiResponse(responseCode = "4xx", description = "페어룸 히스토리 타이머 남은 시간 업데이트 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> updateTimerRemainingTime(
            String accessCode,
            @Parameter(description = "페어룸 히스토리 타이머 남은 시간 업데이트 요청", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE), required = true)
            TimerRemainingTimeUpdateRequest request
    );

    @Operation(summary = "최신 페어룸 히스토리의 타이머 시간을 업데이트한다.")
    @ApiResponse(responseCode = "204", description = "페어룸 히스토리 타이머 시간 업데이트 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "4xx", description = "페어룸 히스토리 타이머 시간 업데이트 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> updateTimerDuration(
            String accessCode,
            @Parameter(description = "페어룸 히스토리 시간 업데이트 요청", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE), required = true)
            TimerDurationUpdateRequest request
    );

    @Operation(summary = "타이머를 조회한다.")
    @ApiResponse(responseCode = "200", description = "페어룸 히스토리 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = TimerReadResponse.class)))
    @ApiResponse(responseCode = "4xx", description = "페어룸 히스토리 생성 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<TimerReadResponse> getTimer(
            String accessCode
    );
}
