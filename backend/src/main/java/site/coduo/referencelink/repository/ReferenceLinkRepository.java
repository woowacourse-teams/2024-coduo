package site.coduo.referencelink.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.referencelink.exception.ReferenceLinkException;

public interface ReferenceLinkRepository extends JpaRepository<ReferenceLinkEntity, Long> {

    default ReferenceLinkEntity fetchById(long id) {
        return findById(id)
                .orElseThrow(() -> new ReferenceLinkException("존재하지 않는 링크입니다.."));
    }
}
