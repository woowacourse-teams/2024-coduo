package site.coduo.retrospect.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import site.coduo.member.domain.Member;
import site.coduo.pairroom.repository.PairRoomEntity;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "RETROSPECT")
@Entity
public class RetrospectEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAIR_ROOM_ID")
    private PairRoomEntity pairRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public RetrospectEntity(final PairRoomEntity pairRoom, final Member member) {
        this(0L, pairRoom, member);
    }

    public RetrospectEntity(final Long id, final PairRoomEntity pairRoom, final Member member) {
        this.id = id;
        this.pairRoom = pairRoom;
        this.member = member;
    }
}
