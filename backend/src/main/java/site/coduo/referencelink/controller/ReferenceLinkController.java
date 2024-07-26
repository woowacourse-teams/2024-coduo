package site.coduo.referencelink.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.controller.docs.ReferenceLinkDocs;
import site.coduo.referencelink.service.ReferenceLinkService;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkUpdateRequest;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://3.35.178.58"})
public class ReferenceLinkController implements ReferenceLinkDocs {

    private final ReferenceLinkService referenceLinkService;

    @PostMapping("/{accessCode}/reference-link")
    public ResponseEntity<Void> createReferenceLink(
            @PathVariable("accessCode") final String accessCode,
            @Valid @RequestBody final ReferenceLinkCreateRequest request
    ) {
        referenceLinkService.createReferenceLinkCommand(accessCode, request);

        return ResponseEntity.created(URI.create("/"))
                .build();
    }

    @GetMapping("/{accessCode}/reference-link")
    public ResponseEntity<List<ReferenceLinkResponse>> getReferenceLinks(
            @PathVariable("accessCode") final String accessCodeText
    ) {
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLinkQuery(accessCodeText);

        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{accessCode}/reference-link/{id}")
    public ResponseEntity<Void> deleteReferenceLink(
            @PathVariable("accessCode") final String accessCode,
            @PathVariable("id") final long id
    ) {
        referenceLinkService.deleteReferenceLinkCommand(id);

        return ResponseEntity.noContent()
                .build();
    }
}
