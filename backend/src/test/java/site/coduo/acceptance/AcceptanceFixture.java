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
        openGraphRepository.deleteAll();
        referenceLinkRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }
}
