package site.coduo.retrospect.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.retrospect.controller.response.FindRetrospectResponse;
import site.coduo.retrospect.controller.response.FindRetrospectsResponse;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.domain.RetrospectContents;
import site.coduo.retrospect.exception.MaxRetrospectLimitException;
import site.coduo.retrospect.exception.NotRetrospectOwnerAccessException;
import site.coduo.retrospect.repository.RetrospectEntity;
import site.coduo.retrospect.repository.RetrospectRepository;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RetrospectService {

    private final PairRoomRepository pairRoomRepository;
    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final MemberService memberService;
    private final RetrospectRepository retrospectRepository;

    @Transactional
    public void createRetrospect(
            final String credentialToken,
            final String pairRoomAccessCode,
            final List<String> answers
    ) {
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(pairRoomAccessCode);
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.fetchByPairRoomAndMember(pairRoom, member);
        if (retrospectRepository.existsRetrospectEntityByPairRoomMember(pairRoomMember)) {
            throw new MaxRetrospectLimitException("회고가 이미 존재합니다.");
        }
        final RetrospectContents retrospectContents = RetrospectContents.from(answers);
        final Retrospect retrospect = new Retrospect(retrospectContents);
        final List<RetrospectEntity> retrospectContentEntities = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> new RetrospectEntity(pairRoomMember, retrospectContent.getQuestionType(),
                        retrospectContent.getAnswer().getValue()))
                .toList();
        retrospectRepository.saveAll(retrospectContentEntities);
    }

    public FindRetrospectsResponse findAllRetrospectsByMember(final String credentialToken) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final List<PairRoomMemberEntity> byMember = pairRoomMemberRepository.findByMember(member);

        final List<FindRetrospectResponse> findRetrospects = byMember.stream()
                .filter(this::existsAnyRetrospect)
                .map(this::convertRetrospect)
                .toList();

        return new FindRetrospectsResponse(findRetrospects);
    }

    private FindRetrospectResponse convertRetrospect(final PairRoomMemberEntity pairRoomMember) {
        final List<RetrospectContent> retrospectContents = retrospectRepository
                .findAllByPairRoomMember(pairRoomMember)
                .stream()
                .map(RetrospectEntity::toDomain)
                .toList();

        final Retrospect retrospect = new Retrospect(new RetrospectContents(retrospectContents));
        return new FindRetrospectResponse(pairRoomMember.getPairRoom().getAccessCode(),
                retrospect.getContents().getFirst().getAnswer().getValue());
    }

    public Retrospect findRetrospectByAccessCode(final String credentialToken, final String accessCode) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.fetchByPairRoomAndMember(
                pairRoomEntity, member);

        final List<RetrospectEntity> allByPairRoomMember = retrospectRepository.findAllByPairRoomMember(
                pairRoomMember);

        final List<RetrospectContent> retrospectContents = allByPairRoomMember.stream()
                .map(RetrospectEntity::toDomain)
                .toList();

        return new Retrospect(new RetrospectContents(retrospectContents));
    }

    @Transactional
    public void deleteRetrospect(final String credentialToken, final String accessCode) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository
                .fetchByPairRoomAndMember(pairRoomEntity, member);
        checkRetrospectOwner(pairRoomMember, member);
        retrospectRepository.deleteAllByPairRoomMember(pairRoomMember);
    }

    private void checkRetrospectOwner(final PairRoomMemberEntity pairRoomMember, final Member member) {
        if (pairRoomMember.getMember().equals(member)) {
            return;
        }
        throw new NotRetrospectOwnerAccessException("본인 소유가 아닌 회고는 삭제할 수 없습니다.");
    }

    public boolean existRetrospectWithPairRoom(final String credentialToken, final String pairRoomAccessCode) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(pairRoomAccessCode);
        if (!pairRoomMemberRepository.existsByPairRoomAndMember(pairRoom, member)) {
            return false;
        }
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.fetchByPairRoomAndMember(pairRoom, member);
        return existsAnyRetrospect(pairRoomMember);
    }

    private boolean existsAnyRetrospect(final PairRoomMemberEntity pairRoomMember) {
        final List<RetrospectEntity> retrospects = retrospectRepository.findAllByPairRoomMember(pairRoomMember);

        return retrospects.stream()
                .map(RetrospectEntity::getContent)
                .anyMatch(content -> !content.isEmpty());
    }
}
