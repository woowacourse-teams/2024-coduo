package site.coduo.pairroom.controller;

import org.springframework.http.HttpStatus;
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
    public PairRoomReadResponse getPairRoom(@RequestParam("accessCode") final PairRoomReadRequest accessCode) {
        return PairRoomReadResponse.from(service.findByAccessCode(accessCode.accessCode()));
    }

    @PostMapping("/pair-room")
    @ResponseStatus(HttpStatus.CREATED)
    public PairRoomCreateResponse createPairRoom(@RequestBody final PairRoomCreateRequest pairRoomCreateRequest) {
        return new PairRoomCreateResponse(service.save(pairRoomCreateRequest));
    }
}
