package site.coduo.todo.infrastructure.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.Todo;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "TODO")
@Entity
public class TodoEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private PairRoom pairRoom;

    @Column(name = "CONTENT", nullable = false, length = 255)
    private String content;

    @Column(name = "SORT", nullable = false)
    private int sort;

    @Column(name = "IS_CHECKED", nullable = false)
    private boolean isChecked;

    public TodoEntity(final Todo todo) {
        this(
                todo.getId(),
                todo.getPairRoom(),
                todo.getContent().getContent(),
                todo.getSort().getSort(),
                todo.getIsChecked().isChecked()
        );
    }

    public TodoEntity(
            final Long id,
            final PairRoom pairRoom,
            final String content,
            final int sort,
            final boolean isChecked
    ) {
        this.id = id;
        this.pairRoom = pairRoom;
        this.content = content;
        this.sort = sort;
        this.isChecked = isChecked;
    }

    public Todo toDomain() {
        return new Todo(
                this.id,
                this.pairRoom,
                this.content,
                this.sort,
                this.isChecked
        );
    }
}
