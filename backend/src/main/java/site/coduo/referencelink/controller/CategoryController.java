package site.coduo.referencelink.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.service.CategoryService;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;
import site.coduo.referencelink.service.dto.CategoryReadResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{accessCode}/category")
    public ResponseEntity<List<CategoryReadResponse>> getCategories(@PathVariable("accessCode") String accessCode) {
        final List<CategoryReadResponse> response = categoryService.findAllByPairRoomAccessCode(accessCode);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{accessCode}/category")
    public ResponseEntity<CategoryCreateResponse> createCategory(@PathVariable("accessCode") String accessCode,
                                                                 @RequestBody @Valid CategoryCreateRequest request
    ) {
        final CategoryCreateResponse response = categoryService.createCategory(accessCode, request);

        return ResponseEntity.created(URI.create("/"))
                .body(response);
    }
}
