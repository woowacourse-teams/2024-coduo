package site.coduo.pairroom.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.dto.CreatePairRoom;
import site.coduo.pairroom.service.PairRoomService;

@RequiredArgsConstructor
@RestController
public class PairRoomController {

    private final PairRoomService service;

    @GetMapping("/pair-room")
    public PairRoom getPairRoom(@RequestParam final String accessCode) {
        return service.findByAccessCode(accessCode);
    }

    @PostMapping("/pair-room")
    @ResponseStatus(HttpStatus.CREATED)
    public String createPairRoom(@RequestBody final CreatePairRoom createPairRoom) {
        return service.save(createPairRoom);
    }
}
