package site.coduo.retrospect.controller.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.retrospect.domain.Retrospect;

@Schema(description = "특정 회고 id 조회 응답 바디")
public record FindRetrospectByIdResponse(
        @Schema(description = "페어룸 접근 코드")
        String accessCode,
        @Schema(description = "회고 내용")
        List<String> answers
) {

    public static FindRetrospectByIdResponse from(final Retrospect retrospect) {
        final List<String> answers = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> retrospectContent.getAnswer().getValue())
                .toList();
        return new FindRetrospectByIdResponse(retrospect.getPairRoom().getAccessCodeText(), answers);
    }
}
