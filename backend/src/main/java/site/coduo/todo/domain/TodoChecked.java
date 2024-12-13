package site.coduo.todo.domain;

import lombok.Getter;

@Getter
public class TodoChecked {

    private final boolean isChecked;

    public TodoChecked(final boolean isChecked) {
        this.isChecked = isChecked;
    }

    public TodoChecked toggle() {
        return new TodoChecked(!isChecked);
    }
}
