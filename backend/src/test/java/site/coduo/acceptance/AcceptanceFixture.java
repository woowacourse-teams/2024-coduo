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
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import(TestConfig.class)
abstract class AcceptanceFixture {

    @Autowired
    protected MemberRepository memberRepository;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TimerRepository timerRepository;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void tearDown() {
        timerRepository.deleteAll();
        memberRepository.deleteAll();
        openGraphRepository.deleteAll();
        referenceLinkRepository.deleteAll();
        categoryRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }
}
