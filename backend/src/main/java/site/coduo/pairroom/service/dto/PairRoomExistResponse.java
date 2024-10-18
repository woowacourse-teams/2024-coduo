package site.coduo.pairroom.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 존재 여부 확인 응답 바디")
public record PairRoomExistResponse(@Schema(description = "페어룸 존재 확인") boolean exists) {
}
