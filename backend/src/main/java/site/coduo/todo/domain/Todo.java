package site.coduo.todo.domain;

import java.util.List;

import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.exception.InvalidTodoArgumentException;

@Getter
public class Todo {

    private final Long id;
    private final PairRoom pairRoom;
    private final TodoContent content;
    private final TodoSort sort;
    private final TodoChecked isChecked;

    public Todo(
            final Long id,
            final PairRoom pairRoom,
            final String content,
            final int sort,
            final boolean isChecked
    ) {
        this(
                id,
                pairRoom,
                new TodoContent(content),
                new TodoSort(sort),
                new TodoChecked(isChecked)
        );
    }

    private Todo(
            final Long id,
            final PairRoom pairRoom,
            final TodoContent content,
            final TodoSort sort,
            final TodoChecked isChecked
    ) {
        validatePairRoom(pairRoom);

        this.id = id;
        this.pairRoom = pairRoom;
        this.content = content;
        this.sort = sort;
        this.isChecked = isChecked;
    }

    private void validatePairRoom(final PairRoom pairRoom) {
        if (pairRoom == null) {
            throw new InvalidTodoArgumentException("Pair Room 정보로 null을 입력할 수 없습니다.");
        }
    }

    public Todo updateContent(final String content) {
        return new Todo(
                this.id,
                this.getPairRoom(),
                new TodoContent(content),
                this.getSort(),
                this.getIsChecked()
        );
    }

    public Todo toggleTodoChecked() {
        return new Todo(
                this.id,
                this.getPairRoom(),
                this.getContent(),
                this.getSort(),
                this.getIsChecked().toggle()
        );
    }

    public Todo updateSort(final List<Todo> todos, final int destinationSort) {
        final List<TodoSort> todoSorts = todos.stream()
                .map(Todo::getSort)
                .toList();

        return new Todo(
                this.id,
                this.getPairRoom(),
                this.getContent(),
                this.getSort().update(todoSorts, destinationSort),
                this.getIsChecked()
        );
    }
}
