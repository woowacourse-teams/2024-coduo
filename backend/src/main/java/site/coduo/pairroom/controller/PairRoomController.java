package site.coduo.pairroom.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.controller.docs.PairRoomDocs;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomReadRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroom.dto.PairRoomReadResponse;
import site.coduo.pairroom.service.PairRoomService;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PairRoomController implements PairRoomDocs {

    private final PairRoomService service;

    @GetMapping("/pair-room")
    public ResponseEntity<PairRoomReadResponse> getPairRoom(@RequestParam("accessCode") final PairRoomReadRequest accessCode) {
        final PairRoomReadResponse response = PairRoomReadResponse.from(service.findByAccessCode(accessCode.accessCode()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/pair-room")
    public ResponseEntity<PairRoomCreateResponse> createPairRoom(@RequestBody final PairRoomCreateRequest pairRoomCreateRequest) {
        final PairRoomCreateResponse response = new PairRoomCreateResponse(service.save(pairRoomCreateRequest));
        return ResponseEntity.created(URI.create("/"))
                .body(response);
    }
}
