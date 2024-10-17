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
import site.coduo.retrospect.domain.RetrospectQuestionType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "RETROSPECT_CONTENT")
@Entity
public class RetrospectContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RETROSPECT_ID")
    private RetrospectEntity retrospect;

    @Enumerated(EnumType.STRING)
    @Column(name = "QUESTION_TYPE", nullable = false)
    private RetrospectQuestionType questionType;

    @Column(name = "CONTENT", length = 500, nullable = false)
    private String content;

    public RetrospectContentEntity(
            final RetrospectEntity retrospect,
            final RetrospectQuestionType questionType,
            final String content
    ) {
        this(0L, retrospect, questionType, content);
    }

    public RetrospectContentEntity(
            final Long id,
            final RetrospectEntity retrospect,
            final RetrospectQuestionType questionType,
            final String content
    ) {
        this.id = id;
        this.retrospect = retrospect;
        this.questionType = questionType;
        this.content = content;
    }
}
