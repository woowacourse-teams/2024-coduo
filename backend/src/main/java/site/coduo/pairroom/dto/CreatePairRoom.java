package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 생성 요청 바디")
public record CreatePairRoom(@Schema(description = "페어 A의 이름") String nameA,
                             @Schema(description = "페어 B의 이름") String nameB) {
}
