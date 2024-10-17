package site.coduo.retrospect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RetrospectContentRepository extends JpaRepository<RetrospectContentEntity, Long> {

    List<RetrospectContentEntity> findAllByRetrospect(RetrospectEntity retrospect);
}
