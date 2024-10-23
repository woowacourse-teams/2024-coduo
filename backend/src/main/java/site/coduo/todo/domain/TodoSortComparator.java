package site.coduo.todo.domain;

import java.util.Comparator;

public class TodoSortComparator implements Comparator<Todo> {

    @Override
    public int compare(final Todo o1, final Todo o2) {
        return Double.compare(o1.getSort().getSort(), o2.getSort().getSort());
    }
}
