package site.coduo.retrospect.controller.request;

import java.util.List;

public record CreateRetrospectRequest(String pairRoomAccessCode, List<String> answers) {
}
