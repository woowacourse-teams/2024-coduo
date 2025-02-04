package site.coduo.acceptance;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.BlockingQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.todo.service.dto.CreateTodoRequest;
import site.coduo.todo.service.dto.TodoReadResponse;

class TodoWebSocketControllerTest extends AcceptanceFixture {

    @Autowired
    private PairRoomRepository pairRoomRepository;

    private BlockingQueue<List<TodoReadResponse>> messages;
    private BlockingQueue<CreateTodoRequest> send;

    private WebSocketStompClient webSocketClient() {
        final StandardWebSocketClient client = new StandardWebSocketClient();
        final WebSocketTransport transport = new WebSocketTransport(client);
        final List<Transport> transports = Collections.singletonList(transport);
        SockJsClient sockJsClient = new SockJsClient(transports);
        return new WebSocketStompClient(sockJsClient);
    }

}
