package site.coduo.todo.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.todo.service.TodoService;
import site.coduo.todo.service.dto.CreateTodoRequest;
import site.coduo.todo.service.dto.TodoReadResponse;
import site.coduo.todo.service.dto.UpdateTodoContentRequest;
import site.coduo.todo.service.dto.UpdateTodoOrderRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TodoWebSocketController {

    private final TodoService todoService;

    @MessageMapping("/{accessCode}/todo/post")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> createTodo(final CreateTodoRequest request,
                                             @DestinationVariable("accessCode") final String accessCode) {
        todoService.createTodo(accessCode, request.contents());
        return todoService.getAllOrderBySort(accessCode);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/order")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoOrder(final UpdateTodoOrderRequest request,
                                                  @DestinationVariable("accessCode") final String accessCode,
                                                  @DestinationVariable("todoId") final Long id) {
        todoService.updateTodoSort(id, request.order());
        return todoService.getAllOrderBySort(accessCode);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/contents")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoContent(@DestinationVariable("todoId") final long todoId,
                                                    @DestinationVariable("accessCode") final String accessCode,
                                                    final UpdateTodoContentRequest request) {
        todoService.updateTodoContent(todoId, request.contents());
        return todoService.getAllOrderBySort(accessCode);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/checked")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoCheck(@DestinationVariable("todoId") final long todoId,
                                                  @DestinationVariable("accessCode") final String accessCode) {
        todoService.toggleTodoChecked(todoId);
        return todoService.getAllOrderBySort(accessCode);
    }

    @MessageMapping("/todo/{accessCode}/{todoId}/delete")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> delete(@DestinationVariable("todoId") final long todoId) {
        return todoService.deleteTodo(todoId);
    }
}
