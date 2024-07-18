package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.ReferenceLinkNotFoundException;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkUpdateRequest;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReferenceLinkService {

    private final ReferenceLinkRepository referenceLinkRepository;

    @Transactional
    public void createReferenceLinkCommand(final ReferenceLinkCreateRequest request) {
        final ReferenceLink referenceLink = new ReferenceLink(request.url());
        final ReferenceLinkEntity referenceLinkEntity = new ReferenceLinkEntity(referenceLink);
        referenceLinkRepository.save(referenceLinkEntity);
    }

    public List<ReferenceLinkResponse> readAllReferenceLinkQuery() {
        return referenceLinkRepository.findAll()
                .stream()
                .map(referenceLink -> new ReferenceLinkResponse(referenceLink.getUrl()))
                .toList();
    }

    @Transactional
    public void updateReferenceLinkCommand(final long id, final ReferenceLinkUpdateRequest request) {
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.findById(id)
                .orElseThrow(() -> new ReferenceLinkNotFoundException("찾을 수 없는 레퍼런스 링크입니다."));

        final ReferenceLink referenceLink = new ReferenceLink(request.url());
        referenceLinkEntity.update(referenceLink);
    }

    @Transactional
    public void deleteReferenceLinkCommand(final long id) {
        referenceLinkRepository.deleteById(id);
    }
}
