package site.coduo.sync.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import site.coduo.common.controller.response.ApiErrorResponse;

public interface SseDocs {

    @Operation(summary = "특정 key에 속하는 SSE 연결을 생성한다. 타이머 동기화 시 key는 accessCode가 된다.")
    @ApiResponse(responseCode = "200", description = "SSE 연결 성공 - event:connect\ndata:OK 메시지를 응답", content = @Content(mediaType = MediaType.TEXT_EVENT_STREAM_VALUE))
    @ApiResponse(responseCode = "4xx", description = "SSE 연결 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<SseEmitter> createConnection(String key);

    @Operation(summary = "특정 key에 속하는 SSE 연결을 모두 삭제한다.")
    @ApiResponse(responseCode = "204", description = "SSE 삭제 성공 - event:close\ndata:OK 메시지를 응답", content = @Content(mediaType = MediaType.TEXT_EVENT_STREAM_VALUE))
    ResponseEntity<Void> deleteConnection(String key);
}
