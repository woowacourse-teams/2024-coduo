package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import io.restassured.RestAssured;
import site.coduo.fixture.PairRoomCreateRequestFixture;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;

@Transactional
class CategoryAcceptanceTest extends AcceptanceFixture {

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

    @Test
    @DisplayName("카테고리 요청 시 정보를 반환한다.")
    void show_category() {
        //given
        final PairRoomCreateResponse pairRoomUrl = PairRoomAcceptanceTest.createPairRoom(
                PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

        createCategory(pairRoomUrl.accessCode(), new CategoryCreateRequest("새로운 카테고리"));

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

    @Test
    @DisplayName("카테고리 삭제에 성공한다.")
    void delete_category() {
        //given
        final PairRoomCreateResponse pairRoomUrl = PairRoomAcceptanceTest.createPairRoom(
                PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

        final CategoryCreateResponse category = createCategory(pairRoomUrl.accessCode(),
                new CategoryCreateRequest("자바"));

        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .delete("/api/{accessCode}/category/{categoryId}", pairRoomUrl.accessCode(), category.id())

                .then()
                .log()
                .all()
                .statusCode(204);
    }
}
