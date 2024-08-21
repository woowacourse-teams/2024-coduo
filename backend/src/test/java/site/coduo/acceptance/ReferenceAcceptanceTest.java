package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import static site.coduo.acceptance.PairRoomAcceptanceTest.createPairRoom;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;

@Transactional
class ReferenceAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("레퍼런스 링크 생성 요청")
    void reference_link_create_request() {
        // given
        final PairRoomCreateResponse pairRoom =
                createPairRoom(new PairRoomCreateRequest("레모네", "프람", "IN_PROGRESS"));
        final CategoryCreateResponse category = CategoryAcceptanceTest.createCategory(
                pairRoom.accessCode(), new CategoryCreateRequest("타입스크립트"));

        final Map<String, Object> request = Map.of("url", "http://www.naber.com", "categoryId", category.id());

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .log().all()
                .post("/api/" + pairRoom.accessCode() + "/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, "/");
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회하는 요청")
    void read_all_reference_link_request() {
        // given
        final PairRoomCreateResponse pairRoom =
                createPairRoom(new PairRoomCreateRequest("레모네", "프람", "IN_PROGRESS"));
        createReferenceLink("http://www.some1.url", pairRoom.accessCode(), "카테고리1");
        createReferenceLink("http://www.some2.url", pairRoom.accessCode(), "카테고리2");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .get("/api/" + pairRoom.accessCode() + "/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("size()", is(2));
    }

    @Test
    @DisplayName("오픈그래프 정보가 없는 레퍼런스 링크를 조회하면 도메인만 넣어 반환한다.")
    void read_reference_link_without_open_graph() {
        // given
        final PairRoomCreateResponse pairRoom =
                createPairRoom(new PairRoomCreateRequest("잉크", "해시", "IN_PROGRESS"));
        final String expectedUrl = "http://www.deleasfsdte.com";
        createReferenceLink(expectedUrl, pairRoom.accessCode(), "카테고리");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .get("/api/" + pairRoom.accessCode() + "/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("[0].url", is(expectedUrl))
                .body("[0].headTitle", is("www.deleasfsdte.com"))
                .body("[0].openGraphTitle", is(""))
                .body("[0].description", is(""))
                .body("[0].image", is(""));
    }

    void createReferenceLink(final String url, String accessCodeText, String categoryName) {
        final CategoryCreateResponse response = CategoryAcceptanceTest.createCategory(
                accessCodeText, new CategoryCreateRequest(categoryName));
        final Map<String, Object> request = Map.of("url", url, "categoryId", response.id());

        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .post("/api/" + accessCodeText + "/reference-link");
    }

    @Test
    @DisplayName("레퍼런스 링크를 삭제하는 요청")
    void delete_reference_link_request() {
        // given
        final PairRoomCreateResponse pairRoom =
                createPairRoom(new PairRoomCreateRequest("레모네", "프람", "IN_PROGRESS"));

        createReferenceLink("http://www.delete.com", pairRoom.accessCode(), "카테고리 이름");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .log().all()
                .delete("/api/" + pairRoom.accessCode() + "/reference-link/1")

                .then()
                .assertThat()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
