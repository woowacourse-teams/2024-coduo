package site.coduo.referencelink.service;

import java.net.URL;

import site.coduo.referencelink.domain.OpenGraph;

public interface HtmlParser {

    OpenGraph getOpenGraph(final URL url);
}
