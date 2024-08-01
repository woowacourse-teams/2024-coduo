package site.coduo.referencelink.domain;


import static org.assertj.core.api.Assertions.assertThat;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class OpenGraphTest {

    @Test
    @DisplayName("Document의 오픈그래프 데이터가 모두 없으면 null을 반환한다.")
    void return_null_when_no_open_graph_properties_in_document() {
        // given
        String htmlString = "<HTML>"
                + "<HEAD>"
                + "<TITLE>Jsoup Test</TITLE>"
                + "</HEAD>"
                + "<BODY>"
                + "</BODY>"
                + "</HTML>";
        Document document = Jsoup.parse(htmlString);

        // when & then
        assertThat(OpenGraph.from(document)).isNull();
    }

    @Test
    @DisplayName("Document가 null이면 null을 반환한다.")
    void return_null_when_cannot_find_document() {
        // given
        Document document = null;

        // when & then
        assertThat(OpenGraph.from(document)).isNull();
    }

    @Nested
    @DisplayName("Document의 오픈그래프 데이터가 하나라도 존재하면 생성한다.")
    class CreateOpenGraphWithNullPropertyTests {

        @Test
        @DisplayName("오픈그래프 생성 테스트: title = null, description = not null, image = not null")
        void create_open_graph_with_null_title() {
            // given
            String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:description\" content=\"Description Hello\">"
                    + "<meta property=\"og:image\" content=\"Image Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            Document document = Jsoup.parse(htmlString);
            OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getTitle()).isNull(),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isEqualTo("Image Hello")
            );
        }

        @Test
        @DisplayName("오픈그래프 생성 테스트: title = not null, description = null, image = not null")
        void create_open_graph_with_null_description() {
            // given
            String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:title\" content=\"Title Hello\">"
                    + "<meta property=\"og:image\" content=\"Image Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            Document document = Jsoup.parse(htmlString);
            OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getTitle()).isEqualTo("Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isNull(),
                    () -> assertThat(openGraph.getImage()).isEqualTo("Image Hello")
            );
        }

        @Test
        @DisplayName("오픈그래프 생성 테스트: title = not null, description = not null, image = null")
        void create_open_graph_with_null_image() {
            // given
            String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:title\" content=\"Title Hello\">"
                    + "<meta property=\"og:description\" content=\"Description Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            Document document = Jsoup.parse(htmlString);
            OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getTitle()).isEqualTo("Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isNull()
            );
        }
    }
}
