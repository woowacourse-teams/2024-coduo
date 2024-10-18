package site.coduo.retrospect.controller.response;

import java.util.List;

import site.coduo.retrospect.domain.Retrospect;

public record FindRetrospectByIdResponse(String pairRoomAccessCode, List<String> answers) {

    public static FindRetrospectByIdResponse of(Retrospect retrospect) {
        final List<String> answers = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> retrospectContent.getAnswer().getValue())
                .toList();
        return new FindRetrospectByIdResponse(retrospect.getPairRoom().getAccessCodeText(), answers);
    }
}
