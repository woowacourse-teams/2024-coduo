package site.coduo.todo.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.todo.service.TodoServiceFacade;
import site.coduo.todo.service.dto.CreateTodoRequest;
import site.coduo.todo.service.dto.TodoReadResponse;
import site.coduo.todo.service.dto.UpdateTodoContentRequest;
import site.coduo.todo.service.dto.UpdateTodoOrderRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TodoWebSocketController {

    private final TodoServiceFacade todoServiceFacade;

    @MessageMapping("/{accessCode}/todo/post")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> createTodo(final CreateTodoRequest request,
                                             @DestinationVariable("accessCode") final String accessCode) {
        return todoServiceFacade.createTodo(request, accessCode);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/order")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoOrder(final UpdateTodoOrderRequest request,
                                                  @DestinationVariable("accessCode") final String accessCode,
                                                  @DestinationVariable("todoId") final Long id) {
        return todoServiceFacade.updateTodoOrder(request, accessCode, id);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/contents")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoContent(@DestinationVariable("todoId") final long todoId,
                                                    @DestinationVariable("accessCode") final String accessCode,
                                                    final UpdateTodoContentRequest request) {
        return todoServiceFacade.updateTodoContent(request, accessCode, todoId);
    }

    @MessageMapping("/{accessCode}/todo/update/{todoId}/checked")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> modifyTodoCheck(@DestinationVariable("todoId") final Long todoId,
                                                  @DestinationVariable("accessCode") final String accessCode) {
        return todoServiceFacade.updateTodoChecked(todoId, accessCode);
    }

    @MessageMapping("{accessCode}/todo/delete/{todoId}")
    @SendTo("/topic/{accessCode}/todo")
    public List<TodoReadResponse> delete(@DestinationVariable("todoId") final Long todoId,
                                         @DestinationVariable("accessCode") final String accessCode) {
        return todoServiceFacade.deleteTodo(todoId, accessCode);
    }
}
