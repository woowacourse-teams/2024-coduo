package site.coduo.acceptance;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;

import io.restassured.RestAssured;
import site.coduo.config.TestConfig;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@Import(TestConfig.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
abstract class AcceptanceFixture {

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void tearDown() {
        referenceLinkRepository.deleteAll();
        pairRoomRepository.deleteAll();
//        jdbcTemplate.update("ALTER TABLE REFERENCE_LINK AlTER COLUMN ID RESTART WITH 1"); //TODO: h2에서만 지원하는 문법이여서 해결 필요
    }
}
