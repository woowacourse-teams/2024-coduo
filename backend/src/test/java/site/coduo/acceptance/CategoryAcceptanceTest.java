package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import io.restassured.RestAssured;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;

@Transactional
class CategoryAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("카테고리 요청 시 정보를 반환한다.")
    void show_category() {
        //given
        final PairRoomCreateResponse pairRoomUrl = PairRoomAcceptanceTest.createPairRoom(
                new PairRoomCreateRequest("레디", "프람"));

        createCategory("abcdef", new CategoryCreateRequest("새로운 카테고리"));

        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .get("/api/{accessCode}/category", pairRoomUrl.accessCode())

                .then()
                .log()
                .all()
                .statusCode(200);
    }

    static CategoryCreateResponse createCategory(final String accessCode, final CategoryCreateRequest request) {
        return RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/category", accessCode)

                .then()
                .extract()
                .as(CategoryCreateResponse.class);
    }
}
