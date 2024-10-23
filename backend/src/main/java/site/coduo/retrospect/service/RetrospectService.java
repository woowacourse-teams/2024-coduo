package site.coduo.retrospect.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.domain.RetrospectContents;
import site.coduo.retrospect.domain.RetrospectV2;
import site.coduo.retrospect.exception.NotRetrospectOwnerAccessException;
import site.coduo.retrospect.exception.RetrospectNotFoundException;
import site.coduo.retrospect.repository.RetrospectContentEntity;
import site.coduo.retrospect.repository.RetrospectContentRepository;
import site.coduo.retrospect.repository.RetrospectEntity;
import site.coduo.retrospect.repository.RetrospectRepository;
import site.coduo.retrospect.repository.RetrospectV2Entity;
import site.coduo.retrospect.repository.RetrospectV2Repository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
//TODO 해당 서비스는 회고를 저장하는 서비스
public class RetrospectService {

    private final PairRoomRepository pairRoomRepository;
    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final RetrospectRepository retrospectRepository;
    private final RetrospectContentRepository retrospectContentRepository;
    private final MemberService memberService;
    private final RetrospectV2Repository retrospectV2Repository;

    @Transactional
    public void createRetrospect(
            final String credentialToken,
            final String pairRoomAccessCode,
            final List<String> answers
    ) {
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(pairRoomAccessCode);
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.findByPairRoomAndMember(pairRoom, member);
        final RetrospectContents retrospectContents = RetrospectContents.from(answers);
        final RetrospectV2 retrospect = new RetrospectV2(retrospectContents);
        final List<RetrospectV2Entity> retrospectContentEntities = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> new RetrospectV2Entity(pairRoomMember, retrospectContent.getQuestionType(),
                        retrospectContent.getAnswer().getValue()))
                .toList();
        retrospectV2Repository.saveAll(retrospectContentEntities);
//        createRetrospect(pairRoom, member, answers);
    }
//
//    private void createRetrospect(
//            final PairRoomEntity pairRoom,
//            final Member member,
//            final List<String> answers
//    ) {
//        final RetrospectContents retrospectContents = RetrospectContents.from(answers);
//
//        final Retrospect retrospect = new Retrospect(pairRoom.toDomain(), member, retrospectContents);
//        final RetrospectEntity savedRetrospectEntity = retrospectRepository.save(
//                new RetrospectEntity(pairRoom, member));
//        createRetrospectContents(retrospect, savedRetrospectEntity);
//    }
//
//    private void createRetrospectContents(final Retrospect retrospect, final RetrospectEntity retrospectEntity) {
//        final List<RetrospectContentEntity> retrospectContentEntities = retrospect.getContents().getValues()
//                .stream()
//                .map(retrospectContent -> new RetrospectContentEntity(
//                        retrospectEntity,
//                        retrospectContent.getQuestionType(),
//                        retrospectContent.getAnswer().getValue()))
//                .toList();
//        retrospectContentRepository.saveAll(retrospectContentEntities);
//    }

    public List<Retrospect> findAllRetrospectsByMember(final String credentialToken) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final List<RetrospectEntity> retrospectEntities = retrospectRepository.findAllByMember(member);

        return retrospectEntities.stream()
                .map(this::convertRetrospect)
                .toList();
    }

    private Retrospect convertRetrospect(final RetrospectEntity retrospectEntity) {
        final List<RetrospectContent> retrospectContents = retrospectContentRepository.findAllByRetrospect(
                        retrospectEntity)
                .stream()
                .map(RetrospectContentEntity::toDomain)
                .toList();

        return new Retrospect(
                retrospectEntity.getPairRoom().toDomain(),
                retrospectEntity.getMember(),
                new RetrospectContents(retrospectContents)
        );
    }

    public RetrospectV2 findRetrospectByAccessCode(final String credentialToken, final String accessCode) {
        // TODO 액세스 코드로 pairRoomMember 찾기.

        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.findByPairRoomAndMember(
                pairRoomEntity, member);

        final List<RetrospectV2Entity> allByPairRoomMember = retrospectV2Repository.findAllByPairRoomMember(
                pairRoomMember);

        final List<RetrospectContent> retrospectContents = allByPairRoomMember.stream()
                .map(RetrospectV2Entity::toDomain)
                .toList();

        return new RetrospectV2(new RetrospectContents(retrospectContents));
    }

    public Retrospect findRetrospectById(final Long retrospectId) {
        final RetrospectEntity retrospectEntity = retrospectRepository.findById(retrospectId)
                .orElseThrow(() -> new RetrospectNotFoundException("해당 아이디에 일치하는 회고 데이터가 존재하지 않습니다."));
        return convertRetrospect(retrospectEntity);
    }

    @Transactional
    public void deleteRetrospect(final String credentialToken, Long retrospectId) {
        final RetrospectEntity retrospectEntity = retrospectRepository.findById(retrospectId)
                .orElseThrow(() -> new RetrospectNotFoundException("해당 아이디에 일치하는 회고 데이터가 존재하지 않습니다."));
        checkRetrospectOwner(retrospectEntity, credentialToken);
        retrospectContentRepository.deleteAllByRetrospect(retrospectEntity);
        retrospectRepository.delete(retrospectEntity);
    }

    private void checkRetrospectOwner(final RetrospectEntity retrospectEntity, final String credentialToken) {
        final Member client = memberService.findMemberByCredential(credentialToken);
        if (retrospectEntity.getMember() != client) {
            throw new NotRetrospectOwnerAccessException("본인 소유가 아닌 회고는 삭제할 수 없습니다.");
        }
    }

    public boolean existRetrospectWithPairRoom(final String credentialToken, final String pairRoomAccessCode) {
        final Member member = memberService.findMemberByCredential(credentialToken);
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(pairRoomAccessCode);
        return retrospectRepository.existsByMemberAndPairRoom(member, pairRoom);
    }
}
