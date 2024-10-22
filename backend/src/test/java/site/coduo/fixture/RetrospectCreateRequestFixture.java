package site.coduo.fixture;

import java.util.List;

import site.coduo.retrospect.controller.request.CreateRetrospectRequest;

public class RetrospectCreateRequestFixture {

    public static CreateRetrospectRequest setCreateRequest() {
        return new CreateRetrospectRequest(
                "ac",
                List.of("회고 답변 1", "회고 답변 2", "회고 답변 3", "회고 답변 4", "회고 답변5", "회고 답변6", "회고 답변7")
        );
    }

    public static CreateRetrospectRequest setWrongCreateRequest() {
        return new CreateRetrospectRequest(
                "ac",
                List.of("", "회고 답변 2", "회고 답변 3", "회고 답변 4", "회고 답변5", "회고 답변6", "회고 답변7")
        );
    }
}
