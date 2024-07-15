package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.ReferenceLinkNotFoundException;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkUpdateRequest;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReferenceLinkService {

    private final ReferenceLinkRepository referenceLinkRepository;

    @Transactional
    public void createReferenceLinkCommand(final ReferenceLinkCreateRequest request) {
        final ReferenceLink referenceLink = new ReferenceLink(request.url());
        referenceLinkRepository.save(referenceLink);
    }

    public List<ReferenceLinkResponse> readAllReferenceLinkQuery() {
        return referenceLinkRepository.findAll()
                .stream()
                .map(referenceLink -> new ReferenceLinkResponse(referenceLink.getUrl()))
                .toList();
    }

    @Transactional
    public void updateReferenceLinkCommand(final ReferenceLinkUpdateRequest request) {
        final ReferenceLink referenceLink = referenceLinkRepository.findById(request.id())
                .orElseThrow(() -> new ReferenceLinkNotFoundException("찾을 수 없는 레퍼런스 링크입니다."));

        referenceLink.update(request.url());
    }

    @Transactional
    public void deleteReferenceLinkCommand(final Long id) {
        referenceLinkRepository.deleteById(id);
    }
}
