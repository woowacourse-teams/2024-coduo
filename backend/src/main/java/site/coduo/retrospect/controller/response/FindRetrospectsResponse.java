package site.coduo.retrospect.controller.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.retrospect.domain.Retrospect;

@Schema(description = "특정 사용자 회고 전체 조회 응답 바디")
public record FindRetrospectsResponse(
        @Schema(description = "바디 데이터")
        List<Data> retrospects
) {

    public static FindRetrospectsResponse from(List<Retrospect> retrospects) {
        final List<Data> data = retrospects.stream()
                .map(retrospect -> new Data(
                        retrospect.getId(),
                        retrospect.getPairRoom().getAccessCodeText(),
                        retrospect.getContents().getFirst().getAnswer().getValue()
                )).toList();

        return new FindRetrospectsResponse(data);
    }

    record Data(
            @Schema(description = "회고 아이디", example = "1")
            Long retrospectId,
            @Schema(description = "페어룸 접근 코드")
            String accessCode,
            @Schema(description = "첫번째 회고 답변", example = "답변1")
            String answer
    ){}
}
