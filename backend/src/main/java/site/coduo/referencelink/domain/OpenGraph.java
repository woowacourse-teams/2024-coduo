package site.coduo.referencelink.domain;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OpenGraph {

    private static final String DEFAULT_VALUE = "";
    private static final String OPEN_GRAPH_META_TAG_SELECTOR = "meta[property=og:%s]";

    private final String headTitle;
    private final String openGraphTitle;
    private final String description;
    private final String image;

    public OpenGraph() {
        this.headTitle = DEFAULT_VALUE;
        this.openGraphTitle = DEFAULT_VALUE;
        this.description = DEFAULT_VALUE;
        this.image = DEFAULT_VALUE;
    }

    @Builder
    private OpenGraph(final String headTitle,
                     final String openGraphTitle,
                     final String description,
                     final String image
    ) {
        this.headTitle = headTitle;
        this.openGraphTitle = openGraphTitle;
        this.description = description;
        this.image = image;
    }

    public static OpenGraph from(final Document document) {
        return OpenGraph.builder()
                .headTitle(document.title())
                .openGraphTitle(findMetaTag(document, "title"))
                .description(findMetaTag(document, "description"))
                .image(findMetaTag(document, "image"))
                .build();
    }

    private static String findMetaTag(final Document document, final String key) {
        final Element element = document.selectFirst(String.format(OPEN_GRAPH_META_TAG_SELECTOR, key));
        if (element == null) {
            return DEFAULT_VALUE;
        }
        return element.attr("content");
    }
}
