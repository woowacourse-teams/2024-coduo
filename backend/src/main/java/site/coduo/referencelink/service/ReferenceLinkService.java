package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.exception.AccessCodeNotFoundException;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.domain.Url;
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
    private final PairRoomRepository pairRoomRepository;

    @Transactional
    public void createReferenceLinkCommand(final String accessCodeText, final ReferenceLinkCreateRequest request) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoom pairRoom = pairRoomRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new AccessCodeNotFoundException("찾을 수 없는 엑세스 코드입니다."));
        final ReferenceLink referenceLink = new ReferenceLink(new Url(request.url()), accessCode);
        final ReferenceLinkEntity referenceLinkEntity = new ReferenceLinkEntity(referenceLink, pairRoom);
        referenceLinkRepository.save(referenceLinkEntity);
    }

    public List<ReferenceLinkResponse> readAllReferenceLinkQuery(String accessCodeText) {

        return referenceLinkRepository.findAll()
                .stream()
                .filter(link -> link.isSameAccessCode(new AccessCode(accessCodeText)))
                .map(link -> new ReferenceLinkResponse(link.getUrl()))
                .toList();
    }

    @Transactional
    public void deleteReferenceLinkCommand(final long id) {
        referenceLinkRepository.deleteById(id);
    }
}
