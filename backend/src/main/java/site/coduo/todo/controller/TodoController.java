package site.coduo.todo.controller;

import java.util.List;
import java.util.stream.IntStream;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://3.35.178.58"})
@RequestMapping("/api")
@RestController
public class TodoController implements TodoDocs {

    private final TodoService todoService;

    @GetMapping("/{accessCode}/todos")
    public List<GetTodoResponse> getTodos(@PathVariable String accessCode) {
        final List<Todo> allTodos = todoService.getAllOrderBySort(accessCode);
        return IntStream.range(0, allTodos.size())
                .mapToObj(index -> GetTodoResponse.from(allTodos.get(index), index))
                .toList();
    }

    @PostMapping("/{accessCode}/todos")
    public void createTodo(@PathVariable String accessCode, @RequestBody CreateTodoRequest request) {
        todoService.createTodo(accessCode, request.content());
    }

    @PatchMapping("/todos/{todoId}/contents")
    public void updateContent(@PathVariable Long todoId, @RequestBody UpdateTodoContentRequest request) {
        todoService.updateTodoContent(todoId, request.content());
    }

    @PatchMapping("/todos/{todoId}/checked")
    public void toggleTodoChecked(@PathVariable Long todoId) {
        todoService.toggleTodoChecked(todoId);
    }

    @PatchMapping("/todos/{todoId}/order")
    public void updateTodoOrder(@PathVariable Long todoId, @RequestBody UpdateTodoOrderRequest request) {
        todoService.updateTodoSort(todoId, request.order());
    }

    @DeleteMapping("/todos/{todoId}")
    public void deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
    }
}
