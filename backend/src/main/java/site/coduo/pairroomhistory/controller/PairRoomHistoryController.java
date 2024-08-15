package site.coduo.pairroomhistory.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroomhistory.controller.docs.PairRoomHistoryDocs;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.service.PairRoomHistoryService;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://coduo.site"})
public class PairRoomHistoryController implements PairRoomHistoryDocs {

    private final PairRoomHistoryService pairRoomHistoryService;

    @PostMapping("/{accessCode}/history")
    public ResponseEntity<Void> createPairRoomHistory(
            @PathVariable("accessCode") final String accessCode,
            @RequestBody final PairRoomHistoryCreateRequest request
    ) {
        pairRoomHistoryService.createPairRoomHistory(accessCode, request);

        return ResponseEntity.created(URI.create("/"))
                .build();
    }
}
