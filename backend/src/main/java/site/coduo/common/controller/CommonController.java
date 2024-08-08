package site.coduo.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class CommonController {

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Coduo is OK";
    }

    @GetMapping("/help")
    public String help() {
        return "불쌍한 켈리를 살려주세요...";
    }
}
