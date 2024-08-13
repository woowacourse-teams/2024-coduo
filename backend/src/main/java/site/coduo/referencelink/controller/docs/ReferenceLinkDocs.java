package site.coduo.referencelink.controller.docs;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Tag(name = "레퍼런스 링크 API")
public interface ReferenceLinkDocs {

    @Operation(summary = "레퍼런스 링크를 생성한다.")
    @ApiResponse(responseCode = "200", description = "레퍼런스 링크 생성 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ReferenceLinkCreateRequest.class)))
    @ApiResponse(responseCode = "4xx", description = "레퍼런스 링크 생성 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> createReferenceLink(
            String accessCode,
            @Parameter(description = "레퍼런스 링크 생성 요청", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE), required = true) ReferenceLinkCreateRequest request
    );

    @Operation(summary = "모든 레퍼런스 링크를 조회한다.")
    @ApiResponse(responseCode = "200", description = "레퍼런스 링크 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ReferenceLinkResponse.class)))
    @ApiResponse(responseCode = "4xx", description = "레퍼런스 링크 조회 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<List<ReferenceLinkResponse>> getReferenceLinks(String accessCode);

    @Operation(summary = "레퍼런스 링크를 삭제한다.")
    @ApiResponse(responseCode = "200", description = "레퍼런스 링크 삭제 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "4xx", description = "레퍼런스 링크 삭제 실패", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> deleteReferenceLink(
            String accessCode,
            @Parameter(description = "레퍼런스 링크 식별자", required = true) long id
    );
}
