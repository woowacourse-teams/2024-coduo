package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.concurrent.TimeUnit;

import org.awaitility.Awaitility;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import site.coduo.fake.FakeScheduledFuture;
import site.coduo.member.exception.AuthorizationException;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.TimestampRegistry;

@SpringBootTest
class SchedulerServiceTest {

    @Autowired
    private SchedulerRegistry schedulerRegistry;

    @Autowired
    private TimestampRegistry timestampRegistry;

    @Autowired
    private EventStreamsRegistry eventStreamsRegistry;

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private SchedulerService schedulerService;

    @MockBean
    private PairRoomService pairRoomService;

    @Test
    @Disabled
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
    @Disabled
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
    @Disabled
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

    @Test
    @DisplayName("타임스탬프 정보를 registry에서 삭제한다.")
    void remove_timestamp_in_timestamp_registry() {
        // given
        final String key = "some-access-code";
        final String userId = "fram";
        eventStreamsRegistry.register(key);
        schedulerRegistry.register(key, new FakeScheduledFuture());
        timestampRegistry.register(key, new Timer(new AccessCode(key), 10000L, 10000L));
        when(pairRoomService.isParticipant(anyString(), anyString()))
                .thenReturn(true);

        // when
        schedulerService.detach(key, "accessCode");

        // then
        assertThat(timestampRegistry.has(key)).isFalse();
    }


    @Test
    @DisplayName("스케줄링 정보를 registry에서 삭제한다.")
    void remove_scheduling_info_in_scheduling_registry() {
        // given
        final String key = "some-access-code";
        eventStreamsRegistry.register(key);
        schedulerRegistry.register(key, new FakeScheduledFuture());
        timestampRegistry.register(key, new Timer(new AccessCode(key), 10000L, 10000L));
        when(pairRoomService.isParticipant(anyString(), anyString()))
                .thenReturn(true);

        // when
        schedulerService.detach(key, "accessToken");

        // then
        assertThat(schedulerRegistry.has(key)).isFalse();
    }

    @Test
    @DisplayName("키에 해당하는 SSE 커넥션를 종료한다.")
    void disconnect_specific_sse_with_key() {
        // given
        final String key = "some-access-code";
        eventStreamsRegistry.register(key);
        schedulerRegistry.register(key, new FakeScheduledFuture());
        timestampRegistry.register(key, new Timer(new AccessCode(key), 10000L, 10000L));
        when(pairRoomService.isParticipant(anyString(), anyString()))
                .thenReturn(true);

        // when
        schedulerService.detach(key, "accessToken");

        // then
        assertThat(eventStreamsRegistry.hasNoStreams(key)).isTrue();
    }

    @Test
    @DisplayName("해당 방에 등록되지 않은 사용자가 타이머를 비활성화할 경우 예외를 발생시킨다.")
    void return_exception_if_user_who_is_not_registered_in_the_room() {
        // given
        final String key = "some-access-code";
        eventStreamsRegistry.register(key);
        schedulerRegistry.register(key, new FakeScheduledFuture());
        timestampRegistry.register(key, new Timer(new AccessCode(key), 10000L, 10000L));
        when(pairRoomService.isParticipant(anyString(), anyString()))
                .thenReturn(false);

        // when & then
        assertThatThrownBy(() -> schedulerService.detach(key, "accessToken"))
                .isInstanceOf(AuthorizationException.class);
    }
}
