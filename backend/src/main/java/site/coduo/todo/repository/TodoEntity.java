package site.coduo.todo.repository;

import jakarta.persistence.Column;
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
import site.coduo.pairroom.repository.PairRoomEntity;
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
    @JoinColumn(name = "PAIR_ROOM_ID", referencedColumnName = "ID")
    private PairRoomEntity pairRoomEntity;

    @Column(name = "CONTENT", nullable = false, length = 255)
    private String content;

    @Column(name = "SORT", nullable = false)
    private double sort;

    @Column(name = "IS_CHECKED", nullable = false)
    private boolean isChecked;

    public TodoEntity(final Todo todo) {
        this.id = todo.getId();
        this.content = todo.getContent().getContent();
        this.sort = todo.getSort().getSort();
        this.isChecked = todo.getIsChecked().isChecked();
    }

    public TodoEntity(final Todo todo, final PairRoomEntity pairRoom) {
        this.id = todo.getId();
        this.pairRoomEntity = pairRoom;
        this.sort = todo.getSort().getSort();
        this.content = todo.getContent().getContent();
        this.isChecked = todo.getIsChecked().isChecked();
    }

    public Todo toDomain() {
        return new Todo(this.id, this.content, this.sort, this.isChecked);
    }

    @Override
    public String toString() {
        return "TodoEntity{" +
                "id=" + id +
                ", pairRoomEntity=" + pairRoomEntity +
                ", content='" + content + '\'' +
                ", sort=" + sort +
                ", isChecked=" + isChecked +
                '}';
    }
}
