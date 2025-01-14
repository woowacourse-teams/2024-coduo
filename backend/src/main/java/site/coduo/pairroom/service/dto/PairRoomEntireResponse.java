package site.coduo.pairroom.service.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.todo.service.dto.TodoReadResponse;

public record PairRoomEntireResponse(

        @Schema(description = "첫 번째 페어의 이름", example = "해시")
        String navigator,

        @Schema(description = "두 번째 페어의 이름", example = "파슬리")
        String driver,

        @Schema(description = "페어룸의 상태", example = "IN_PROGRESS")
        String status,

        @Schema(description = "타이머 시간 (millisecond 기준)", example = "10000")
        long duration,

        @Schema(description = "타이머 남은 시간 (millisecond 기준)", example = "5000")
        long remainingTime,

        @Schema(description = "미션 리포지토리 링크", example = "https://github.com/coduo-missions/coduo-javascript-rps")
        String missionUrl,

        @Schema(description = "생성된 투두 응답 목록")
        List<TodoReadResponse> todos,

        @Schema(description = "생성된 카테고르 응답 목록")
        List<CategoryReadResponse> categories,

        @Schema(description = "생성된 레퍼런스 링크 목록")
        List<ReferenceLinkResponse> references) {

    public static PairRoomEntireResponse of(
            PairRoomReadResponse pairRoomReadResponse,
            List<TodoReadResponse> todoResponses,
            List<CategoryReadResponse> categoryReadResponses,
            List<ReferenceLinkResponse> referenceLinkResponses
    ) {
        return new PairRoomEntireResponse(pairRoomReadResponse.navigator(), pairRoomReadResponse.driver(),
                pairRoomReadResponse.status(), pairRoomReadResponse.duration(), pairRoomReadResponse.remainingTime(),
                pairRoomReadResponse.missionUrl(), todoResponses, categoryReadResponses, referenceLinkResponses);
    }
}
