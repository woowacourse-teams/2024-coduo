package site.coduo.member.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByAccessToken(String accessToken);

    Optional<Member> findByUserId(String provider);
}
