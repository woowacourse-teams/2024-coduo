package site.coduo.retrospect.controller.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회고 생성 요청 바디")
public record CreateRetrospectRequest(
        @Schema(description = "페어룸 접근 코드")
        String pairRoomAccessCode,
        @Schema(description = "회고 내용")
        List<String> answers
) {
}
