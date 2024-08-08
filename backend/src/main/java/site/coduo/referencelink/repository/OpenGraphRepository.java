package site.coduo.referencelink.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenGraphRepository extends JpaRepository<OpenGraphEntity, Long> {

    void deleteByReferenceLinkEntityId(Long referenceLinkEntityId);
}
