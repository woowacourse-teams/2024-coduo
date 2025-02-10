package site.coduo.referencelink.controller;

import jakarta.validation.Valid;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.service.CategoryService;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;

@Controller
@RequiredArgsConstructor
public class CategoryWebSocketController {

    private final CategoryService categoryService;

    @MessageMapping("/send/{accessCode}/category/post")
    @SendTo("/topic/{accessCode}/category")
    public CategoryCreateResponse createCategory(@DestinationVariable("accessCode") final String accessCode,
                                                      @Valid @RequestBody final CategoryCreateRequest request) {
        return categoryService.createCategory(accessCode, request);
    }

}
