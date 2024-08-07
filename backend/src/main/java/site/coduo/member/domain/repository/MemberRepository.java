package site.coduo.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
