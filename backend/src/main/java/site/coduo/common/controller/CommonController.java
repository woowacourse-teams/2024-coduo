package site.coduo.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Coduo is OK";
    }
}
