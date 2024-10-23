package site.coduo.retrospect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//TODO 없어져야 할거 RetrospectV2Repository로 대체
public interface RetrospectContentRepository extends JpaRepository<RetrospectContentEntity, Long> {

    List<RetrospectContentEntity> findAllByRetrospect(RetrospectEntity retrospect);

    void deleteAllByRetrospect(RetrospectEntity retrospect);
}
