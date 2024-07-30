package site.coduo.pairroom.domain.accesscode;

public interface AccessCodeStrategy {

    int ACCESS_CODE_LENGTH = 6;

    String generateAccessCode();
}
