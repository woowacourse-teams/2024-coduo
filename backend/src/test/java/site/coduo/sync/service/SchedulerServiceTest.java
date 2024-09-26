package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.concurrent.TimeUnit;

import org.awaitility.Awaitility;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.TimestampRegistry;

@Disabled
@SpringBootTest
class SchedulerServiceTest {

    @Autowired
    private ThreadPoolTaskScheduler taskScheduler;

    @Autowired
    private SchedulerRegistry schedulerRegistry;

    @Autowired
    private TimestampRegistry timestampRegistry;

    private TimerRepository timerRepository;
    private SseService sseService;
    private SchedulerService schedulerService;

    @BeforeEach
    void setUp() {
        timerRepository = mock(TimerRepository.class);
        sseService = mock(SseService.class);

        schedulerService = new SchedulerService(
                taskScheduler,
                schedulerRegistry,
                timestampRegistry,
                timerRepository,
                sseService
        );
    }

    @Test
    @DisplayName("타이머를 2초 실행한다.")
    void start_timer_3_seconds() {
        // given
        final String key = "access";
        final PairRoomEntity pairRoomEntity = PairRoomEntity.builder().accessCode(key).build();
        final Timer timer = new Timer(new AccessCode(key), 5000L, 5000L);
        when(timerRepository.fetchTimerByAccessCode(key))
                .thenReturn(new TimerEntity(timer, pairRoomEntity));

        // when
        schedulerService.start(key);

        // then
        Awaitility
                .await()
                .atMost(2, TimeUnit.SECONDS)
                .pollInterval(1, TimeUnit.SECONDS)
                .untilAsserted(() -> {
                    final long expected = timer.getRemainingTime() - 2 * 1000;
                    assertThat(timestampRegistry.get(key).getRemainingTime()).isEqualTo(expected);
                });
    }

    @Test
    @DisplayName("타이머 실행시 남은 시간이 0이 되면 스케줄링이 종료되고 타임스탬프가 삭제된다.")
    void start_timer_unit_zero() {
        // given
        final String key = "access";
        final PairRoomEntity pairRoomEntity = PairRoomEntity.builder().accessCode(key).build();
        final Timer timer = new Timer(new AccessCode(key), 3000L, 3000L);
        when(timerRepository.fetchTimerByAccessCode(key))
                .thenReturn(new TimerEntity(timer, pairRoomEntity));

        // when
        schedulerService.start(key);

        // then
        Awaitility
                .await()
                .pollInterval(1, TimeUnit.SECONDS)
                .untilAsserted(() ->
                        assertThat(timestampRegistry.has(key)).isFalse()
                );
    }

    @Test
    @DisplayName("실행중인 타이머를 중지한다.")
    void stop_timer() {
        // given
        final String key = "access";
        final PairRoomEntity pairRoomEntity = PairRoomEntity.builder().accessCode(key).build();
        final Timer timer = new Timer(new AccessCode(key), 5000L, 5000L);
        when(timerRepository.fetchTimerByAccessCode(key))
                .thenReturn(new TimerEntity(timer, pairRoomEntity));
        schedulerService.start(key);

        // when & then
        Awaitility
                .await()
                .pollDelay(1, TimeUnit.SECONDS)
                .pollInterval(1, TimeUnit.SECONDS)
                .untilAsserted(() -> {
                    schedulerService.pause(key);
                    assertThat(schedulerRegistry.has(key)).isFalse();
                });
    }
}
