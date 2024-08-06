package site.coduo.acceptance;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

import io.restassured.RestAssured;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
abstract class AcceptanceFixture {

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void tearDown() {
        // 모든 변경 사항을 DB에 반영
        entityManager.flush();

        // 테이블의 모든 레코드 삭제 (순서 중요, 자식 먼저 삭제 후 부모 삭제해야 한다.)
        entityManager.createNativeQuery("DELETE FROM OPEN_GRAPH").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM REFERENCE_LINK").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM PAIR_ROOM").executeUpdate();

        // ID 재설정
        resetIdSequences();
    }

    // ID 시퀀스 재설정 메서드
    private void resetIdSequences() {
        String dialect = entityManager.getEntityManagerFactory().getProperties().get("hibernate.dialect").toString();

        if (dialect.contains("H2")) {
            entityManager.createNativeQuery("ALTER TABLE PAIR_ROOM ALTER COLUMN ID RESTART WITH 1").executeUpdate();
            entityManager.createNativeQuery("ALTER TABLE REFERENCE_LINK ALTER COLUMN ID RESTART WITH 1")
                    .executeUpdate();
            entityManager.createNativeQuery("ALTER TABLE OPEN_GRAPH ALTER COLUMN ID RESTART WITH 1").executeUpdate();
        }
        if (dialect.contains("MySQL")) {
            entityManager.createNativeQuery("ALTER TABLE PAIR_ROOM AUTO_INCREMENT = 1").executeUpdate();
            entityManager.createNativeQuery("ALTER TABLE REFERENCE_LINK AUTO_INCREMENT = 1").executeUpdate();
            entityManager.createNativeQuery("ALTER TABLE OPEN_GRAPH AUTO_INCREMENT = 1").executeUpdate();
        }
    }
}
