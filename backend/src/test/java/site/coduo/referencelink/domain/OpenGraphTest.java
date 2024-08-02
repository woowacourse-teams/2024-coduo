package site.coduo.referencelink.domain;


import static org.assertj.core.api.Assertions.assertThat;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class OpenGraphTest {

    private static final String DEFAULT_VALUE = "";

    @Test
    @DisplayName("Document의 오픈그래프 데이터가 모두 없으면 기본값으로 채워 반환한다.")
    void fill_default_value_when_no_open_graph_properties_in_document() {
        // given
        final String htmlString = "<HTML>"
                + "<HEAD>"
                + "</HEAD>"
                + "<BODY>"
                + "</BODY>"
                + "</HTML>";
        final Document document = Jsoup.parse(htmlString);

        // when
        final OpenGraph openGraph = OpenGraph.from(document);

        // then
        Assertions.assertAll(
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getDescription()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_VALUE)
        );
    }

    @Test
    @DisplayName("Document가 null이면 기본값으로 채워 반환한다.")
    void fill_default_value_when_cannot_find_document() {
        // given
        final Document document = null;

        // when
        final OpenGraph openGraph = OpenGraph.from(document);

        // then
        Assertions.assertAll(
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getDescription()).isEqualTo(DEFAULT_VALUE),
                () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_VALUE)
        );
    }

    @Nested
    @DisplayName("Document의 오픈그래프 데이터가 하나라도 존재하면 생성한다.")
    class CreateOpenGraphWithNullPropertyTests {

        @Test
        @DisplayName("오픈그래프 생성 테스트: headTitle = null, openGraphTitle = not null, description = not null, image = not null")
        void create_open_graph_with_null_headTitle() {
            // given
            final String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<meta property=\"og:title\" content=\"Open Graph Title Hello\">"
                    + "<meta property=\"og:description\" content=\"Description Hello\">"
                    + "<meta property=\"og:image\" content=\"Image Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            final Document document = Jsoup.parse(htmlString);
            final OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getHeadTitle()).isEqualTo(DEFAULT_VALUE),
                    () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo("Open Graph Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isEqualTo("Image Hello")
            );
        }

        @Test
        @DisplayName("오픈그래프 생성 테스트: headTitle = not null, openGraphTitle = null, description = not null, image = not null")
        void create_open_graph_with_null_openGraphTitle() {
            // given
            final String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:description\" content=\"Description Hello\">"
                    + "<meta property=\"og:image\" content=\"Image Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            final Document document = Jsoup.parse(htmlString);
            final OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getHeadTitle()).isEqualTo("Jsoup Test"),
                    () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_VALUE),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isEqualTo("Image Hello")
            );
        }

        @Test
        @DisplayName("오픈그래프 생성 테스트: headTitle = not null, openGraphTitle = not null, description = null, image = not null")
        void create_open_graph_with_null_description() {
            // given
            final String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:title\" content=\"Open Graph Title Hello\">"
                    + "<meta property=\"og:image\" content=\"Image Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            final Document document = Jsoup.parse(htmlString);
            final OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getHeadTitle()).isEqualTo("Jsoup Test"),
                    () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo("Open Graph Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isEqualTo(DEFAULT_VALUE),
                    () -> assertThat(openGraph.getImage()).isEqualTo("Image Hello")
            );
        }

        @Test
        @DisplayName("오픈그래프 생성 테스트: headTitle = not null, openGraphTitle = not null, description = not null, image = null")
        void create_open_graph_with_null_image() {
            // given
            final String htmlString = "<HTML>"
                    + "<HEAD>"
                    + "<TITLE>Jsoup Test</TITLE>"
                    + "<meta property=\"og:title\" content=\"Open Graph Title Hello\">"
                    + "<meta property=\"og:description\" content=\"Description Hello\">"
                    + "</HEAD>"
                    + "<BODY>"
                    + "</BODY>"
                    + "</HTML>";
            final Document document = Jsoup.parse(htmlString);
            final OpenGraph openGraph = OpenGraph.from(document);

            // when & then
            Assertions.assertAll(
                    () -> assertThat(openGraph.getHeadTitle()).isEqualTo("Jsoup Test"),
                    () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo("Open Graph Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_VALUE)
            );
        }
    }
}
