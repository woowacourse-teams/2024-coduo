package site.coduo.sync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.sync.controller.docs.SseDocs;
import site.coduo.sync.service.SseService;

@Slf4j
@RequiredArgsConstructor
@RestController
public class SseController implements SseDocs {

    private final SseService sseService;

    @GetMapping("/{key}/connect")
    public ResponseEntity<SseEmitter> createConnection(@PathVariable("key") final String key) {
        final SseEmitter sseEmitter = sseService.connect(key);

        return ResponseEntity.ok()
                .header("X-Accel-Buffering", "no")
                .body(sseEmitter);
    }

    @DeleteMapping("/{key}/connect")
    public ResponseEntity<Void> deleteConnection(@PathVariable("key") final String key) {
        sseService.disconnectAll(key);

        return ResponseEntity.noContent()
                .build();
    }
}
