package site.coduo.todo.controller.docs;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import site.coduo.todo.controller.request.CreateTodoRequest;
import site.coduo.todo.controller.request.UpdateTodoContentRequest;
import site.coduo.todo.controller.request.UpdateTodoOrderRequest;
import site.coduo.todo.controller.response.GetTodoResponse;

@Tag(name = "투두 API")
public interface TodoDocs {

    @Operation(summary = "특정 페어룸의 투두 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "투두 목록 조회 성공")
    List<GetTodoResponse> getTodos(
            @Parameter(description = "페어룸 접근 코드", required = true)
            String accessCode
    );

    @Operation(summary = "투두 항목을 생성한다.")
    @ApiResponse(responseCode = "201", description = "투두 저장 성공")
    ResponseEntity<Void> createTodo(
            @Parameter(description = "페어룸 접근 코드", required = true)
            String accessCode,
            @Parameter(description = "투두 항목 내용", required = true)
            CreateTodoRequest request
    );

    @Operation(summary = "투두 내용을 변경한다.")
    @ApiResponse(responseCode = "204", description = "투두 내용 변경 성공")
    ResponseEntity<Void> updateContent(
            @Parameter(description = "변경할 투두 id") final long todoId,
            @Parameter(description = "투두 변경할 내용", required = true) final UpdateTodoContentRequest request
    );

    @Operation(summary = "투두 체크 여부를 변경한다.")
    @ApiResponse(responseCode = "204", description = "투두 토글 성공")
    ResponseEntity<Void> toggleTodoChecked(
            @Parameter(description = "토글할 투두 id")
            @PathVariable("todoId") final long todoId
    );

    @Operation(summary = "투두 정렬 순서를 변경한다.")
    ResponseEntity<Void> updateTodoOrder(
            @Parameter(description = "변경할 투두 id")
            @PathVariable("todoId") final long todoId,
            @Parameter(description = "변경할 투두 정렬 순서", required = true)
            @RequestBody UpdateTodoOrderRequest request
    );

    @Operation(summary = "투두를 삭제한다.")
    ResponseEntity<Void> deleteTodo(
            @Parameter(description = "삭제할 투두 id")
            @PathVariable("todoId") final long todoId
    );
}
