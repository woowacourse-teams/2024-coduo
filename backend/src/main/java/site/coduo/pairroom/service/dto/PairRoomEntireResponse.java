package site.coduo.pairroom.service.dto;

import java.util.List;

import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.todo.service.dto.TodoReadResponse;

public record PairRoomEntireResponse(
        PairRoomReadResponse pairRoomInfo,
        List<TodoReadResponse> todoInfo,
        List<CategoryReadResponse> categoryInfo,
        List<ReferenceLinkResponse> referenceInfo) {

    public static PairRoomEntireResponse of(
            PairRoomReadResponse pairRoomReadResponse,
            List<TodoReadResponse> todoResponses,
            List<CategoryReadResponse> categoryReadResponses,
            List<ReferenceLinkResponse> referenceLinkResponses
    ) {
        return new PairRoomEntireResponse(pairRoomReadResponse, todoResponses, categoryReadResponses,
                referenceLinkResponses);
    }
}
