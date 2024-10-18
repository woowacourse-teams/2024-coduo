package site.coduo.referencelink.fake;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class FakeServerTest {

    @DisplayName("페이크 서버 연결에 성공한다.")
    @Test
    void connect_success() throws IOException {
        final URL url = new URL(FakeServer.testUrl);
        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        assertThat(connection.getResponseCode()).isEqualTo(200);
    }
}
