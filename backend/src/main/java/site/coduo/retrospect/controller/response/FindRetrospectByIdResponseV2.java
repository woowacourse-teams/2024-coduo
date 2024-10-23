package site.coduo.retrospect.controller.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.retrospect.domain.RetrospectV2;

@Schema(description = "특정 회고 id 조회 응답 바디")
public record FindRetrospectByIdResponseV2(
        @Schema(description = "회고 내용")
        List<String> answers
) {

    public static FindRetrospectByIdResponseV2 from(final RetrospectV2 retrospect) {
        final List<String> answers = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> retrospectContent.getAnswer().getValue())
                .toList();
        return new FindRetrospectByIdResponseV2(answers);
    }
}
