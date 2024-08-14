package site.coduo.todo.domain;

import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.exception.InvalidTodoArgumentException;

@Getter
public class Todo {

    private final Long id;
    private final PairRoom pairRoom;
    private final TodoContent content;
    private final TodoSort sort;

    public Todo(
            final Long id,
            final PairRoom pairRoom,
            final String content,
            final int sort
    ) {
        this(
                id,
                pairRoom,
                new TodoContent(content),
                new TodoSort(sort)
        );
    }

    private Todo(
            final Long id,
            final PairRoom pairRoom,
            final TodoContent content,
            final TodoSort sort
    ) {
        validatePairRoom(pairRoom);

        this.id = id;
        this.pairRoom = pairRoom;
        this.content = content;
        this.sort = sort;
    }

    private void validatePairRoom(final PairRoom pairRoom) {
        if (pairRoom == null) {
            throw new InvalidTodoArgumentException("Pair Room 정보로 null을 입력할 수 없습니다.");
        }
    }
}
