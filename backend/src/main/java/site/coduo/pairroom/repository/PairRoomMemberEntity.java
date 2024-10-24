package site.coduo.pairroom.repository;

import java.util.Objects;

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
import site.coduo.member.domain.Member;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PAIR_ROOM_MEMBER")
@Entity
public class PairRoomMemberEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PAIR_ROOM_ID")
    private PairRoomEntity pairRoom;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public PairRoomMemberEntity(final PairRoomEntity pairRoom, final Member member) {
        this.pairRoom = pairRoom;
        this.member = member;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final PairRoomMemberEntity that)) {
            return false;
        }
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PairRoomMemberEntity{" +
                "id=" + id +
                ", pairRoom=" + pairRoom +
                ", member=" + member +
                '}';
    }
}
