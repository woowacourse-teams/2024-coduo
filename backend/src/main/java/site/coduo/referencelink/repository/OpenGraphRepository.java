package site.coduo.referencelink.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenGraphRepository extends JpaRepository<OpenGraphEntity, Long> {

    void deleteByReferenceLinkEntity(ReferenceLinkEntity referenceLinkEntity);

    Optional<OpenGraphEntity> findByReferenceLinkEntityId(Long id);
}
