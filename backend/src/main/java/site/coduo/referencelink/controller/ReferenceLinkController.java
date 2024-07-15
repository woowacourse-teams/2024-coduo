package site.coduo.referencelink.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.service.ReferenceLinkService;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkUpdateRequest;

@RestController
@RequiredArgsConstructor
public class ReferenceLinkController {
    private final ReferenceLinkService referenceLinkService;

    @PostMapping("/reference-link")
    public ResponseEntity<Void> create(@Valid @RequestBody final ReferenceLinkCreateRequest request) {
        referenceLinkService.createReferenceLinkCommand(request);

        return ResponseEntity.created(URI.create("/"))
                .build();
    }

    @GetMapping("/reference-link")
    public ResponseEntity<List<ReferenceLinkResponse>> readAll() {
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLinkQuery();

        return ResponseEntity.ok(responses);
    }

    @PatchMapping("/reference-link")
    public ResponseEntity<Void> update(@Valid @RequestBody final ReferenceLinkUpdateRequest request) {
        referenceLinkService.updateReferenceLinkCommand(request);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/reference-link/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") final Long id) {
        referenceLinkService.deleteReferenceLinkCommand(id);

        return ResponseEntity.noContent()
                .build();
    }
}
