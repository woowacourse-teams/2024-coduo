package site.coduo.member.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;
import site.coduo.member.exception.MemberNotFoundException;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByProviderUserIdAndDeletedAtIsNull(String userId);

    Optional<Member> findByProviderLoginIdAndDeletedAtIsNull(String loginId);

    List<Member> findByDeletedAtIsNull();

    @Override
    default List<Member> findAll() {
        return findByDeletedAtIsNull();
    }

    default Member fetchByUserId(final String userId) {

        return findByProviderUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는(은) 찾을 수 없는 회원 아이디입니다.", userId)));
    }

    default Member fetchByProviderLoginId(final String loginId) {
        return findByProviderLoginIdAndDeletedAtIsNull(loginId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는(은) 찾을 수 없는 회원입니다.", loginId)));
    }

    boolean existsByProviderUserIdAndDeletedAtIsNull(String userId);
}
