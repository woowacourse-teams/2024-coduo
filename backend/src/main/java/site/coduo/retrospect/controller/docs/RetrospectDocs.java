package site.coduo.retrospect.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.ExistRetrospectWithPairRoomResponse;
import site.coduo.retrospect.controller.response.FindRetrospectByIdResponse;
import site.coduo.retrospect.controller.response.FindRetrospectsResponse;

@Tag(name = "회고 API")
public interface RetrospectDocs {

    @Operation(summary = "회고를 생성한다.")
    @ApiResponse(responseCode = "201", description = "회고 생성 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    ResponseEntity<Void> createRetrospect(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "API 요청 바디")
            CreateRetrospectRequest request
    );

    @Operation(summary = "특정 사용자의 전체 회고 정보를 조회한다.")
    @ApiResponse(responseCode = "200", description = "전체 회고 정보 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = FindRetrospectsResponse.class)))
    ResponseEntity<FindRetrospectsResponse> findRetrospects(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken
    );

    @Operation(summary = "특정 회고를 상세 조회 한다.")
    @ApiResponse(responseCode = "200", description = "회고 상세 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = FindRetrospectByIdResponse.class)))
    ResponseEntity<FindRetrospectByIdResponse> findRetrospectById(
            @Parameter(description = "회고 id", required = true) final Long retrospectId
    );

    @Operation(summary = "특정 회고를 삭제 한다.")
    @ApiResponse(responseCode = "204", description = "회고 삭제 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    ResponseEntity<Void> deleteRetrospect(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "회고 id", required = true) final Long retrospectId
    );

    @Operation(summary = "특정 회원, 특정 페어룸에 속한 회고의 존재 여부를 조회한다.")
    @ApiResponse(responseCode = "200", description = "회고 존재 여부 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = ExistRetrospectWithPairRoomResponse.class)))
    ResponseEntity<ExistRetrospectWithPairRoomResponse> existRetrospectWithPairRoom(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "페어룸 접근 코드", required = true)
            String pairRoomAccessCode
    );
}
