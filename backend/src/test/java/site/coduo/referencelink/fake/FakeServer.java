package site.coduo.referencelink.fake;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import site.coduo.referencelink.exception.ReferenceLinkException;

public class FakeServer {

    public static String testUrl;

    static {
        String html = "<html><head>" +
                "<title>헤드 타이틀</title>" +
                "<meta property=\"og:title\" content=\"오픈그래프 타이틀\">" +
                "<meta property=\"og:description\" content=\"오픈그래프 설명\">" +
                "<meta property=\"og:image\" content=\"오픈그래프 이미지\">" +
                "</head><body></body></html>";
        testUrl = "http://localhost:" + createAndStartFakeServer(html) + "/test";
    }

    public static int createAndStartFakeServer(String html) {
        HttpServer server = null;
        try {
            server = HttpServer.create(new InetSocketAddress(0), 0);
        } catch (IOException e) {
            throw new ReferenceLinkException("테스트용 서버 생성에 실패했습니다.");
        }
        int assignedPort = server.getAddress().getPort();

        server.createContext("/test", createHandler(html));
        server.setExecutor(null);
        server.start();
        return assignedPort;
    }

    private static HttpHandler createHandler(final String html) {
        return new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                exchange.sendResponseHeaders(200, html.getBytes(StandardCharsets.UTF_8).length);
                OutputStream os = exchange.getResponseBody();
                os.write(html.getBytes(StandardCharsets.UTF_8));
                os.close();
            }
        };
    }
}
