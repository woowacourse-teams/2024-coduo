package site.coduo.retrospect.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.retrospect.domain.RetrospectAnswer;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.domain.RetrospectQuestionType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "RETROSPECT")
@Entity
public class RetrospectEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAIR_ROOM_MEMBER_ID")
    private PairRoomMemberEntity pairRoomMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "QUESTION_TYPE", nullable = false)
    private RetrospectQuestionType questionType;

    @Column(name = "CONTENT", length = 1000)
    private String content;

    public RetrospectEntity(final PairRoomMemberEntity pairRoomMember,
                            final RetrospectQuestionType questionType,
                            final String content) {
        this.pairRoomMember = pairRoomMember;
        this.questionType = questionType;
        this.content = content;
    }

    public RetrospectContent toDomain() {
        return new RetrospectContent(questionType, new RetrospectAnswer(content));
    }
}
