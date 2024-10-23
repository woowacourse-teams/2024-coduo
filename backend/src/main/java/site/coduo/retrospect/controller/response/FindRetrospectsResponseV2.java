package site.coduo.retrospect.controller.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "특정 사용자 회고 전체 조회 응답 바디")
public record FindRetrospectsResponseV2(
        @Schema(description = "바디 데이터")
        List<FindRetrospectResponseV2> retrospects
) {
}
