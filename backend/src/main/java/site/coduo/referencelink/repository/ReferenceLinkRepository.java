package site.coduo.referencelink.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.referencelink.domain.ReferenceLink;

public interface ReferenceLinkRepository extends JpaRepository<ReferenceLink, Long> {

}
