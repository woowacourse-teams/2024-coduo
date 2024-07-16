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
import site.coduo.pairroom.dto.CreatePairRoom;
import site.coduo.pairroom.dto.PairRoomRequest;
import site.coduo.pairroom.dto.PairRoomResponse;
import site.coduo.pairroom.dto.ReadPairRoom;
import site.coduo.pairroom.service.PairRoomService;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PairRoomController {

    private final PairRoomService service;

    @GetMapping("/pair-room")
    public ReadPairRoom getPairRoom(@RequestParam("accessCode") final PairRoomRequest accessCode) {
        return ReadPairRoom.from(service.findByAccessCode(accessCode.accessCode()));
    }

    @PostMapping("/pair-room")
    @ResponseStatus(HttpStatus.CREATED)
    public PairRoomResponse createPairRoom(@RequestBody final CreatePairRoom createPairRoom) {
        return new PairRoomResponse(service.save(createPairRoom)); // TODO 리팩터링 대상
    }
}
