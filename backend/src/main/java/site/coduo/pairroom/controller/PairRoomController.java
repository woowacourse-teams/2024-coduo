package site.coduo.pairroom.controller;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.controller.docs.PairRoomDocs;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroom.dto.PairRoomDeleteRequest;
import site.coduo.pairroom.dto.PairRoomExistRequest;
import site.coduo.pairroom.dto.PairRoomExistResponse;
import site.coduo.pairroom.dto.PairRoomReadRequest;
import site.coduo.pairroom.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.PairRoomService;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://3.35.178.58"})
public class PairRoomController implements PairRoomDocs {

    private final PairRoomService service;

    @PostMapping("/pair-room")
    public ResponseEntity<PairRoomCreateResponse> createPairRoom(
            @Valid @RequestBody final PairRoomCreateRequest request
    ) {
        final PairRoomCreateResponse response = new PairRoomCreateResponse(service.save(request));

        return ResponseEntity.created(URI.create("/"))
                .body(response);
    }

    @PostMapping("/pair-room/exist")
    public ResponseEntity<PairRoomExistResponse> existPairRoom(
            @Valid @RequestBody final PairRoomExistRequest request
    ) {
        final boolean existed = service.existByAccessCode(request.accessCode());
        final PairRoomExistResponse response = new PairRoomExistResponse(existed);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/pair-room/{accessCode}")
    public ResponseEntity<PairRoomReadResponse> getPairRoom(
            @Valid @PathVariable("accessCode") final PairRoomReadRequest request
    ) {
        final PairRoomReadResponse response = PairRoomReadResponse.from(
                service.findByAccessCode(request.accessCode()));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/pair-room/{accessCode}")
    public ResponseEntity<Void> deletePairRoom(
            @Valid @PathVariable("accessCode") final PairRoomDeleteRequest request
    ) {
        service.deletePairRoom(request.accessCode());

        return ResponseEntity.noContent()
                .build();
    }
}
