package site.coduo.referencelink.controller;

import java.util.List;

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
import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.CategoryUpdateRequest;
import site.coduo.referencelink.service.dto.CategoryUpdateResponse;

@Controller
@RequiredArgsConstructor
public class CategoryWebSocketController {

    private final CategoryService categoryService;

    @MessageMapping("/{accessCode}/category/get")
    @SendTo("/topic/{accessCode}/category")
    public List<CategoryReadResponse> getCategories(@DestinationVariable("accessCode") String accessCode) {
        return categoryService.findAllByPairRoomAccessCode(accessCode);
    }

    @MessageMapping("/{accessCode}/category/post")
    @SendTo("/topic/{accessCode}/category")
    public CategoryCreateResponse createCategory(@DestinationVariable("accessCode") final String accessCode,
                                                 @Valid @RequestBody final CategoryCreateRequest request) {
        return categoryService.createCategory(accessCode, request);
    }

    @MessageMapping("/{accessCode}/category/update")
    @SendTo("/topic/{accessCode}/category")
    public CategoryUpdateResponse updateCategory(@DestinationVariable("accessCode") final String accessCode,
                                                 @Valid @RequestBody final CategoryUpdateRequest request) {
        return categoryService.updateCategoryName(accessCode, request);
    }

    @MessageMapping("/{accessCode}/category/delete/{categoryId}")
    @SendTo("/topic/{accessCode}/category")
    public void deleteCategory(@DestinationVariable("accessCode") String accessCode,
                               @DestinationVariable("categoryId") long categoryId) {
        categoryService.deleteCategory(accessCode, categoryId);
    }
}
