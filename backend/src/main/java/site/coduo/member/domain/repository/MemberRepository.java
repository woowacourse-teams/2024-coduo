package site.coduo.member.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;
import site.coduo.member.exception.MemberNotFoundException;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUserIdAndDeletedAtIsNull(String userId);

    Optional<Member> findByLoginIdAndDeletedAtIsNull(String loginId);

    List<Member> findByDeletedAtIsNull();

    @Override
    default List<Member> findAll() {
        return findByDeletedAtIsNull();
    }

    default Member fetchByUserId(final String userId) {

        return findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는(은) 찾을 수 없는 회원 아이디입니다.", userId)));
    }

    default Member fetchByLoginId(final String loginId) {

        return findByLoginIdAndDeletedAtIsNull(loginId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는(은) 찾을 수 없는 회원입니다.", loginId)));
    }

    boolean existsByUserIdAndDeletedAtIsNull(String userId);
}
