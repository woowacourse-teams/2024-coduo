package site.coduo.pairroom.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어 이름 액세스코드로 페어룸 존재 여부 확인 응답 바디")
public record PairRoomExistByEasyAccessCodeResponse(
        @Schema(description = "페어룸 존재 확인")
        boolean exists,

        @Schema(description = "페어룸 접근 코드")
        String accessCode
) {
}
