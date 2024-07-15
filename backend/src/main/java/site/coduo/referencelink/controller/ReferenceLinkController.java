package site.coduo.referencelink.controller;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.service.ReferenceLinkService;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;

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
}
