package site.coduo.member.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;
import site.coduo.member.exception.MemberNotFoundException;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUserId(String userId);

    default Member fetchByUserId(final String userId) {
        return findByUserId(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는 찾을 수 없는 회원 아이디입니다.", userId)));
    }

    boolean existsByUserId(String userId);

}
