package site.coduo.common.controller.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "에러 응답")
public record ApiErrorResponse(@Schema(description = "에러 메세지", example = "권한이 없는 요청입니다.") String message) {
}
