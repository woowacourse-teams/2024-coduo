package site.coduo.timer.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.timer.domain.Timer;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "TIMER")
@Entity
public class TimerEntity extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "PAIR_ROOM_ID", nullable = false)
    private PairRoomEntity pairRoomEntity;

    @Column(name = "DURATION", nullable = false)
    private long duration;

    @Column(name = "REMAINING_TIME", nullable = false)
    private long remainingTime;

    public TimerEntity(final Timer timer, final PairRoomEntity pairRoomEntity) {
        this.pairRoomEntity = pairRoomEntity;
        this.duration = timer.getDuration();
        this.remainingTime = timer.getRemainingTime();
    }

    public void updateTimerRemainingTime(final long timerRemainingTime) {
        this.remainingTime = timerRemainingTime;
    }

    public void updateTimerDuration(final long timerDuration) {
        this.duration = timerDuration;
    }

    public Timer toDomain() {
        return new Timer(pairRoomEntity.toDomain(), duration, remainingTime);
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TimerEntity that = (TimerEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
