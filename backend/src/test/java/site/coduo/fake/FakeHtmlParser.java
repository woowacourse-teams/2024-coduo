package site.coduo.fake;

import java.net.URL;

import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.service.HtmlParser;

public class FakeHtmlParser implements HtmlParser {

    @Override
    public OpenGraph getOpenGraph(final URL url) {
        return OpenGraph.from(url);
    }
}
