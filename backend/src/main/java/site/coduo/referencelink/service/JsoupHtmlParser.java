package site.coduo.referencelink.service;

import java.io.IOException;
import java.net.URL;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import site.coduo.referencelink.domain.OpenGraph;

@Component
public class JsoupHtmlParser implements HtmlParser {

    @Override
    public OpenGraph getOpenGraph(final URL url) {
        final Connection connect = Jsoup.connect(url.toExternalForm());
        final Document document;
        try {
            document = connect.get();
            if (hasNotTitle(document)) {
                return OpenGraph.of(document, url);
            }
            return OpenGraph.from(document);
        } catch (IOException e) {
            return OpenGraph.from(url);
        }
    }

    private boolean hasNotTitle(final Document document) {
        final Element element = document.selectFirst(String.format(OpenGraph.OPEN_GRAPH_META_TAG_SELECTOR, "title"));
        return document.title().isEmpty() && element == null;
    }
}
