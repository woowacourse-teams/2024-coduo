package site.coduo.referencelink.mq;

import java.net.URL;

import site.coduo.pairroom.repository.PairRoomEntity;

public record ReferenceLinkMQMessageDto(URL url,
                                        PairRoomEntity pairRoomEntity,
                                        long openGraphId) {
}
