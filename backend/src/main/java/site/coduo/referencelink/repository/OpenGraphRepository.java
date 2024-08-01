package site.coduo.referencelink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OpenGraphRepository extends JpaRepository<OpenGraphEntity, Long> {

    OpenGraphEntity save(OpenGraphEntity openGraphEntity);

    @Modifying
    @Query("DELETE FROM OpenGraphEntity o WHERE o.referenceLinkEntity.id = :id")
    void deleteByReferenceLinkEntityId(@Param("id") Long id);
}
