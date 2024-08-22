package site.coduo.referencelink.controller.docs;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;
import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.CategoryUpdateRequest;
import site.coduo.referencelink.service.dto.CategoryUpdateResponse;

public interface CategoryDocs {

    @Operation(summary = "모든 카테고리를 조회한다.")
    @ApiResponse(responseCode = "200", description = "카테고리 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "4xx", description = "카테고리 조회 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<List<CategoryReadResponse>> getCategories(String accessCode);

    @Operation(summary = "카테고리를 생성한다.")
    @ApiResponse(responseCode = "201", description = "카테고리 생성 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = CategoryCreateRequest.class)))
    @ApiResponse(responseCode = "4xx", description = "카테고리 생성 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<CategoryCreateResponse> createCategory(String accessCode, CategoryCreateRequest request);

    @Operation(summary = "카테고리를 수정한다.")
    @ApiResponse(responseCode = "200", description = "카테고리 생성 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = CategoryUpdateRequest.class)))
    @ApiResponse(responseCode = "4xx", description = "카테고리 생성 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<CategoryUpdateResponse> updateCategory(@PathVariable("accessCode") String accessCode,
                                                          @RequestBody CategoryUpdateRequest categoryUpdateRequest
    );

    @Operation(summary = "카테고리를 삭제한다.")
    @ApiResponse(responseCode = "204", description = "카테고리 링크 삭제 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "4xx", description = "카테고리 링크 삭제 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> deleteCategory(String accessCode, String categoryName);
}
