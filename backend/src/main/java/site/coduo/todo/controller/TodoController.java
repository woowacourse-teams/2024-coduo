package site.coduo.todo.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.IntStream;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.todo.controller.docs.TodoDocs;
import site.coduo.todo.controller.request.CreateTodoRequest;
import site.coduo.todo.controller.request.UpdateTodoContentRequest;
import site.coduo.todo.controller.request.UpdateTodoOrderRequest;
import site.coduo.todo.controller.response.GetTodoResponse;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.service.TodoService;

@RequiredArgsConstructor
@RestController
public class TodoController implements TodoDocs {

    private final TodoService todoService;

    @GetMapping("/{accessCode}/todos")
    public List<GetTodoResponse> getTodos(@PathVariable("accessCode") final String accessCode) {
        final List<Todo> allTodos = todoService.getAllOrderBySort(accessCode);
        return IntStream.range(0, allTodos.size())
                .mapToObj(index -> GetTodoResponse.from(allTodos.get(index), index))
                .toList();
    }

    @PostMapping("/{accessCode}/todos")
    public ResponseEntity<Void> createTodo(
            @PathVariable("accessCode") final String accessCode,
            @RequestBody @Valid final CreateTodoRequest request
    ) {
        todoService.createTodo(accessCode, request.content());
        return ResponseEntity.created(URI.create("/")).build();
    }

    @PatchMapping("/todos/{todoId}/contents")
    public ResponseEntity<Void> updateContent(
            @PathVariable("todoId") final long todoId,
            @RequestBody @Valid final UpdateTodoContentRequest request) {
        todoService.updateTodoContent(todoId, request.content());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/todos/{todoId}/checked")
    public ResponseEntity<Void> toggleTodoChecked(@PathVariable("todoId") final long todoId) {
        todoService.toggleTodoChecked(todoId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/todos/{todoId}/order")
    public ResponseEntity<Void> updateTodoOrder(
            @PathVariable("todoId") final long todoId,
            @RequestBody UpdateTodoOrderRequest request
    ) {
        todoService.updateTodoSort(todoId, request.order());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("todoId") final long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.noContent().build();
    }
}
