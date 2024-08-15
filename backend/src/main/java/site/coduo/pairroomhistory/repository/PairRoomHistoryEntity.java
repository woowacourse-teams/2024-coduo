package site.coduo.pairroomhistory.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroomhistory.domain.PairRoomHistory;

@NoArgsConstructor
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

    @Column(name = "TIMER_REMAINING_TIME", nullable = false)
    private long timerRemainigTime;

    public PairRoomHistoryEntity(final PairRoomHistory pairRoomHistory) {
        this.pairRoom = pairRoomHistory.getPairRoom();
        this.driver = pairRoomHistory.getDriver();
        this.navigator = pairRoomHistory.getNavigator();
        this.timerRound = pairRoomHistory.getTimerRound();
        this.timerRemainigTime = pairRoomHistory.getTimerRemainigTime();
    }

    public PairRoomHistory toDomain() {
        return PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver(driver)
                .navigator(navigator)
                .timerRound(timerRound)
                .timerRemainigTime(timerRemainigTime)
                .build();
    }
}
