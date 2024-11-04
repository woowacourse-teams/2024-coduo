package site.coduo.referencelink.domain;

import java.net.URL;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OpenGraph {

    public static final String OPEN_GRAPH_META_TAG_SELECTOR = "meta[property=og:%s]";
    private static final String DEFAULT_VALUE = "";
    private static final int DESCRIPTION_MAX_LENGTH = 50;

    private final String headTitle;
    private final String openGraphTitle;
    private final String description;
    private final String image;

    @Builder
    private OpenGraph(final String headTitle,
                      final String openGraphTitle,
                      final String description,
                      final String image
    ) {
        this.headTitle = headTitle;
        this.openGraphTitle = openGraphTitle;
        this.description = truncate(description);
        this.image = image;
    }

    public OpenGraph() {
        this.headTitle = DEFAULT_VALUE;
        this.openGraphTitle = DEFAULT_VALUE;
        this.description = DEFAULT_VALUE;
        this.image = DEFAULT_VALUE;
    }

    public static OpenGraph from(final Document document) {
        return OpenGraph.builder()
                .headTitle(document.title())
                .openGraphTitle(findMetaTag(document, "title"))
                .description(findMetaTag(document, "description"))
                .image(findMetaTag(document, "image"))
                .build();
    }

    public static OpenGraph of(final Document document, final URL url) {
        return OpenGraph.builder()
                .headTitle(url.getHost())
                .openGraphTitle(findMetaTag(document, "title"))
                .description(findMetaTag(document, "description"))
                .image(findMetaTag(document, "image"))
                .build();
    }

    public static OpenGraph from(final URL url) {
        return OpenGraph.builder()
                .headTitle(url.getHost())
                .openGraphTitle(DEFAULT_VALUE)
                .description(DEFAULT_VALUE)
                .image(DEFAULT_VALUE)
                .build();
    }

    private static String findMetaTag(final Document document, final String key) {
        final Element element = document.selectFirst(String.format(OPEN_GRAPH_META_TAG_SELECTOR, key));
        if (element == null) {
            return DEFAULT_VALUE;
        }
        return element.attr("content");
    }

    private String truncate(final String description) {
        if (description.length() <= DESCRIPTION_MAX_LENGTH) {
            return description;
        }
        return description.substring(0, DESCRIPTION_MAX_LENGTH);
    }
}
