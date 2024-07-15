package site.coduo.referencelink.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReferenceLinkService {

    private final ReferenceLinkRepository referenceLinkRepository;

    public void createReferenceLinkCommand(final ReferenceLinkCreateRequest request) {
        final ReferenceLink referenceLink = new ReferenceLink(request.url());
        referenceLinkRepository.save(referenceLink);
    }
}
