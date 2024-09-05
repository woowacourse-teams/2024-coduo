package site.coduo.pairroomhistory.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroomhistory.domain.PairRoomHistory;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "TIMER")
@Entity
public class PairRoomHistoryEntity extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PAIR_ROOM_ID", nullable = false)
    private PairRoom pairRoom;

    @Column(name = "TIMER_DURATION", nullable = false)
    private long timerDuration;

    @Column(name = "TIMER_REMAINING_TIME", nullable = false)
    private long timerRemainingTime;

    public PairRoomHistoryEntity(final PairRoomHistory pairRoomHistory) {

        this.pairRoom = pairRoomHistory.getPairRoom();
        this.timerDuration = pairRoomHistory.getTimerDuration();
        this.timerRemainingTime = pairRoomHistory.getTimerRemainingTime();
    }

    public void updateTimerRemainingTime(final long timerRemainingTime) {
        this.timerRemainingTime = timerRemainingTime;
    }

    public void updateTimerDuration(final long timerDuration) {
        this.timerDuration = timerDuration;
    }

    public PairRoomHistory toDomain() {
        return new PairRoomHistory(pairRoom, timerDuration, timerRemainingTime);
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoomHistoryEntity that = (PairRoomHistoryEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
