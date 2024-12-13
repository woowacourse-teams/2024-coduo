package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import java.util.concurrent.ScheduledFuture;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fake.FakeScheduledFuture;

class SchedulerRegistryTest {

    @Test
    @DisplayName("key의 스케줄링 상태를 등록한다.")
    void register_scheduler() {
        // given
        final SchedulerRegistry schedulerRegistry = new SchedulerRegistry();
        final String key = "access";
        final ScheduledFuture<?> future = new FakeScheduledFuture();

        // when & then
        assertThatCode(() -> schedulerRegistry.register(key, future))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("key의 스케줄링 상태를 종료로 변경한 뒤 registry에서 삭제한다.")
    void release_scheduler() {
        // given
        final SchedulerRegistry schedulerRegistry = new SchedulerRegistry();
        final String key = "access";
        final ScheduledFuture<?> future = new FakeScheduledFuture();
        schedulerRegistry.register(key, future);

        // when
        schedulerRegistry.release(key);

        // then
        assertThat(future.isCancelled()).isTrue();
    }

    @Test
    @DisplayName("key의 스케줄링 결과가 존재하는지 조회한다.")
    void has_scheduler() {
        // given
        final SchedulerRegistry schedulerRegistry = new SchedulerRegistry();
        final String key = "access";
        final ScheduledFuture<?> future = new FakeScheduledFuture();
        schedulerRegistry.register(key, future);

        // when & then
        assertThat(schedulerRegistry.has(key)).isTrue();
    }

    @Test
    @DisplayName("key의 스케줄링이 종료되었을 경우 false를 반환한다.")
    void is_scheduler_done() {
        // given
        final SchedulerRegistry schedulerRegistry = new SchedulerRegistry();
        final String key = "access";
        final ScheduledFuture<?> future = new FakeScheduledFuture();
        schedulerRegistry.register(key, future);
        schedulerRegistry.release(key);

        // when
        final boolean actual = schedulerRegistry.isActive(key);

        // then
        assertThat(actual).isFalse();
    }

    @Test
    @DisplayName("key의 스케줄링이 실행중일 경우 true를 반환한다.")
    void is_scheduler_active() {
        // given
        final SchedulerRegistry schedulerRegistry = new SchedulerRegistry();
        final String key = "access";
        final ScheduledFuture<?> future = new FakeScheduledFuture();
        schedulerRegistry.register(key, future);

        // when
        final boolean actual = schedulerRegistry.isActive(key);

        // then
        assertThat(actual).isTrue();
    }
}
