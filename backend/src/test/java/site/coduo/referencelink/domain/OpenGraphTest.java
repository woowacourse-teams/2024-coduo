package site.coduo.referencelink.domain;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

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
        assertAll(
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
            assertAll(
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
            assertAll(
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
            assertAll(
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
            assertAll(
                    () -> assertThat(openGraph.getHeadTitle()).isEqualTo("Jsoup Test"),
                    () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo("Open Graph Title Hello"),
                    () -> assertThat(openGraph.getDescription()).isEqualTo("Description Hello"),
                    () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_VALUE)
            );
        }
    }

    @ParameterizedTest
    @ValueSource(ints = {51, 100})
    @DisplayName("description이 50자 넘어가면 50자를 잘라서 저장한다.")
    void truncate_description(final int repeatCount) {
        //given
        final OpenGraph openGraph = OpenGraph.builder()
                .openGraphTitle("my page title")
                .headTitle("my header")
                .description("1".repeat(repeatCount))
                .image("")
                .build();

        //when && then
        assertThat(openGraph.getDescription()).hasSize(50);
    }
}
