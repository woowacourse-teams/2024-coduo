package site.coduo.referencelink.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.service.ReferenceLinkService;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Controller
@RequiredArgsConstructor
public class ReferenceLinkWebSocketController {

    private final ReferenceLinkService referenceLinkService;

    @MessageMapping("/{accessCode}/reference-link/post")
    @SendTo("/topic/{accessCode}/reference-link")
    public List<ReferenceLinkResponse> createReferenceLink(@DestinationVariable("accessCode") final String accessCode,
                                                           final ReferenceLinkCreateRequest request) {
        referenceLinkService.createReferenceLink(accessCode, request);
        return referenceLinkService.findAllReferenceLinkWithOpenGraphByAccessCode(accessCode);
    }

    @MessageMapping("/{accessCode}/reference-link/delete/{referenceLinkId}")
    @SendTo("/topic/{accessCode}/reference-link")
    public List<ReferenceLinkResponse> deleteReferenceLink(@DestinationVariable("accessCode") final String accessCode,
                                                           @DestinationVariable("referenceLinkId") final long referenceLinkId) {
        referenceLinkService.deleteReferenceLink(accessCode, referenceLinkId);
        return referenceLinkService.findAllReferenceLinkWithOpenGraphByAccessCode(accessCode);
    }
}
