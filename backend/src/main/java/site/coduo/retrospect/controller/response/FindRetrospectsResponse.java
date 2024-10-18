package site.coduo.retrospect.controller.response;

import java.util.List;

import site.coduo.retrospect.domain.Retrospect;

public record FindRetrospectsResponse(List<Data> retrospects) {

    public static FindRetrospectsResponse of(List<Retrospect> retrospects) {
        final List<Data> data = retrospects.stream()
                .map(retrospect -> new Data(
                        retrospect.getId(),
                        retrospect.getPairRoom().getAccessCodeText(),
                        retrospect.getContents().getFirst().getAnswer().getValue()
                )).toList();

        return new FindRetrospectsResponse(data);
    }

    record Data(
            Long retrospectId,
            String pairRoomAccessCode,
            String answer
    ){}
}
