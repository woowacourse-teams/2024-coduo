package site.coduo.retrospect.controller.docs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.ExistRetrospectWithPairRoomResponse;
import site.coduo.retrospect.controller.response.FindRetrospectByIdResponseV2;
import site.coduo.retrospect.controller.response.FindRetrospectsResponseV2;

@Tag(name = "회고 API")
public interface RetrospectV2Docs {

    @Operation(summary = "회고를 생성한다.")
    @ApiResponse(responseCode = "201", description = "회고 생성 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "400", description = "잘못된 회고 내용 입력",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> createRetrospect(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "API 요청 바디")
            CreateRetrospectRequest request
    );

    @Operation(summary = "특정 사용자의 전체 회고 정보를 조회한다.")
    @ApiResponse(responseCode = "200", description = "전체 회고 정보 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = FindRetrospectsResponseV2.class)))
    ResponseEntity<FindRetrospectsResponseV2> findRetrospects(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken
    );

    @Operation(summary = "특정 회고를 상세 조회 한다.")
    @ApiResponse(responseCode = "200", description = "회고 상세 조회 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = FindRetrospectByIdResponseV2.class)))
    @ApiResponse(responseCode = "404", description = "존재하지 않는 회고 조회",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<FindRetrospectByIdResponseV2> getRetrospect(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "페어룸 accessCode", required = true) final String accessCode
    );

    @Operation(summary = "특정 회고를 삭제 한다.")
    @ApiResponse(responseCode = "204", description = "회고 삭제 성공", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "404", description = "존재하지 않는 회고 삭제",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    @ApiResponse(responseCode = "403", description = "본인 소유가 아닌 회고 삭제 시도",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = ApiErrorResponse.class)))
    ResponseEntity<Void> deleteRetrospect(
            @Parameter(description = "사용자 식별 보안 코드 (쿠키)", required = true)
            String credentialToken,
            @Parameter(description = "회고 id", required = true) final String accessCode
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
