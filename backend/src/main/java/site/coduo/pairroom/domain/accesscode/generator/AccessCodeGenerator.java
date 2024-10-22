package site.coduo.pairroom.domain.accesscode.generator;

public interface AccessCodeGenerator {

    String generate();

    boolean isEasyAccessCodeGenerator();
}
