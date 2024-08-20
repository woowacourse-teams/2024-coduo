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
import site.coduo.pairroomhistory.domain.Timer;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PAIR_ROOM_HISTORY")
@Entity
public class PairRoomHistoryEntity extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PAIR_ROOM_ID", nullable = false)
    private PairRoom pairRoom;

    @Column(name = "DRIVER", nullable = false)
    private String driver;

    @Column(name = "NAVIGATOR", nullable = false)
    private String navigator;

    @Column(name = "TIMER_ROUND", nullable = false)
    private int timerRound;

    @Column(name = "TIMER_DURATION", nullable = false)
    private long timerDuration;

    @Column(name = "TIMER_REMAINING_TIME", nullable = false)
    private long timerRemainingTime;

    public PairRoomHistoryEntity(final PairRoomHistory pairRoomHistory) {
        final Timer timer = pairRoomHistory.getTimer();

        this.pairRoom = pairRoomHistory.getPairRoom();
        this.driver = pairRoomHistory.getDriver();
        this.navigator = pairRoomHistory.getNavigator();
        this.timerRound = timer.getTimerRound();
        this.timerDuration = timer.getTimerDuration();
        this.timerRemainingTime = timer.getTimerRemainingTime();
    }

    public void updateTimerRemainingTime(final long timerRemainingTime) {
        this.timerRemainingTime = timerRemainingTime;
    }

    public PairRoomHistory toDomain() {
        return PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver(driver)
                .navigator(navigator)
                .timer(new Timer(timerRound, timerDuration, timerRemainingTime))
                .build();
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
