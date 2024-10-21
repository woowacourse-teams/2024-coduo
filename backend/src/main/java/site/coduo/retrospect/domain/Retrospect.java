package site.coduo.retrospect.domain;

import lombok.Getter;
import site.coduo.member.domain.Member;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;
import site.coduo.retrospect.exception.InvalidRetrospectInputValueException;

@Getter
public class Retrospect {

    private static final long DEFAULT_ID = 0;

    private final long id;
    private final PairRoom pairRoom;
    private final Member member;
    private final RetrospectContents contents;

    public Retrospect(
            final PairRoom pairRoom,
            final Member member,
            final RetrospectContents contents
    ) {
        this(DEFAULT_ID, pairRoom, member, contents);
    }

    public Retrospect(
            final long id,
            final PairRoom pairRoom,
            final Member member,
            final RetrospectContents contents
    ) {
        validateRetrospectId(id);
        validatePairRoom(pairRoom);
        validateMember(member);
        validateContents(contents);

        this.id = id;
        this.contents = contents;
        this.pairRoom = pairRoom;
        this.member = member;
    }

    private void validateRetrospectId(final long id) {
        if (id < 0) {
            throw new IllegalArgumentException("회고 아이디 값은 음수가 입력될 수 없습니다. - " + id);
        }
    }

    private void validatePairRoom(final PairRoom pairRoom) {
        if (pairRoom == null) {
            throw new InvalidRetrospectInputValueException("페어룸 객체로 null을 입력할 수 없습니다.");
        }
    }

    private void validateMember(final Member member) {
        if (member == null) {
            throw new InvalidRetrospectInputValueException("회원 객체로 null을 입력할 수 없습니다.");
        }
    }

    private void validateContents(final RetrospectContents contents) {
        if (contents == null) {
            throw new InvalidRetrospectContentException("회고 내용들로 null을 입력할 수 없습니다.");
        }
    }
}
