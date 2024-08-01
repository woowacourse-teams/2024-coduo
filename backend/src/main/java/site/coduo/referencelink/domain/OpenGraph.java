package site.coduo.referencelink.domain;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import lombok.Getter;

@Getter
public class OpenGraph {

    private static final String OPEN_GRAPH_META_TAG_SELECTOR = "meta[property=og:%s]";

    private final String title;
    private final String description;
    private final String image;

    public OpenGraph(final String title, final String description, final String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public static OpenGraph from(final Document document) {
        if (document == null) {
            return null;
        }

        final String title = findMetaTag(document, "title");
        final String description = findMetaTag(document, "description");
        final String image = findMetaTag(document, "image");

        if (title == null && description == null && image == null) {
            return null;
        }
        return new OpenGraph(title, description, image);
    }

    private static String findMetaTag(final Document document, final String key) {
        Element element = document.selectFirst(String.format(OPEN_GRAPH_META_TAG_SELECTOR, key));
        if (element == null) {
            return null;
        }
        return element.attr("content");
    }
}
