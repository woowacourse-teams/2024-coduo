package site.coduo.referencelink.domain;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import lombok.Getter;

@Getter
public class OpenGraph {

    private final String title;
    private final String description;
    private final String image;

    public OpenGraph(final String title, final String description, final String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public static OpenGraph from(final String url) {
        Document doc;
        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            return null;
        }

        final String title = findMetaTag(doc, "title");
        final String description = findMetaTag(doc, "description");
        final String image = findMetaTag(doc, "image");
        return new OpenGraph(title, description, image);
    }

    private static String findMetaTag(final Document doc, final String key) {
        Element element = doc.selectFirst("meta[property=og:" + key + "]");
        if (element == null) {
            return null;
        }
        return element.attr("content");
    }
}
