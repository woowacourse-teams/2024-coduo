package site.coduo.todo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import site.coduo.todo.exception.TodoException;
import site.coduo.todo.exception.TodoWebSocketException;
import site.coduo.todo.service.dto.CreateTodoRequest;
import site.coduo.todo.service.dto.TodoReadResponse;
import site.coduo.todo.service.dto.UpdateTodoContentRequest;
import site.coduo.todo.service.dto.UpdateTodoOrderRequest;

@RequiredArgsConstructor
@Component
public class TodoServiceFacade {

    private static final String TOPIC_FORMAT = "/topic/%s/todo";

    private final TodoService todoService;

    public List<TodoReadResponse> createTodo(final CreateTodoRequest request, final String accessCode) {
        return execute(() -> todoService.createTodo(accessCode, request.contents()), accessCode);
    }

    private List<TodoReadResponse> execute(final Runnable runnable, final String accessCode) {
        try {
            runnable.run();
            return todoService.getAllOrderBySort(accessCode);
        } catch (final TodoException e) {
            throw new TodoWebSocketException(String.format(TOPIC_FORMAT, accessCode), e.getMessage());
        }
    }

    public List<TodoReadResponse> updateTodoOrder(final UpdateTodoOrderRequest request,
                                                  final String accessCode,
                                                  final Long id) {
        return execute(() -> todoService.updateTodoSort(id, request.order()), accessCode);
    }

    public List<TodoReadResponse> updateTodoContent(final UpdateTodoContentRequest request,
                                                    final String accessCode,
                                                    final Long id) {
        return execute(() -> todoService.updateTodoContent(id, request.contents()), accessCode);
    }

    public List<TodoReadResponse> updateTodoChecked(final Long todoId, final String accessCode) {
        return execute(() -> todoService.toggleTodoChecked(todoId), accessCode);
    }

    public List<TodoReadResponse> deleteTodo(final Long todoId, final String accessCode) {
        return execute(() -> todoService.deleteTodo(todoId), accessCode);
    }
}
