package site.coduo.retrospect.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.exception.PairRoomMemberNotJoinException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.domain.RetrospectContents;
import site.coduo.retrospect.exception.NotRetrospectOwnerAccessException;
import site.coduo.retrospect.exception.RetrospectNotFoundException;
import site.coduo.retrospect.repository.RetrospectContentEntity;
import site.coduo.retrospect.repository.RetrospectContentRepository;
import site.coduo.retrospect.repository.RetrospectEntity;
import site.coduo.retrospect.repository.RetrospectRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RetrospectService {

    private final PairRoomRepository pairRoomRepository;
    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final RetrospectRepository retrospectRepository;
    private final RetrospectContentRepository retrospectContentRepository;
    private final MemberService memberService;

    @Transactional
    public void createRetrospect(
            final String credentialToken,
            final String pairRoomAccessCode,
            final List<String> answers
    ) {
        final PairRoomEntity pairRoom = findPairRoom(pairRoomAccessCode);
        final Member member = findMember(credentialToken);
        checkMemberIsJoinInPairRoom(member, pairRoom);
        createRetrospect(pairRoom, member, answers);
    }

    private PairRoomEntity findPairRoom(final String pairRoomAccessCode) {
        if (pairRoomAccessCode == null || pairRoomAccessCode.isEmpty()) {
            throw new IllegalArgumentException("페어룸 접근 코드로 null 혹은 빈 값이 입력될 수 없습니다.");
        }

        return pairRoomRepository.findByAccessCode(pairRoomAccessCode)
                .orElseThrow(() -> new PairRoomNotFoundException(
                        "입력된 페어룸 접근 코드에 대응되는 페어룸이 존재하지 않습니다. - " + pairRoomAccessCode));
    }

    private Member findMember(final String credentialToken) {
        if (credentialToken == null) {
            throw new IllegalArgumentException("보안 토큰으로 null이 입력될 수 없습니다.");
        }

        return memberService.findMemberByCredential(credentialToken);
    }

    private void checkMemberIsJoinInPairRoom(final Member member, final PairRoomEntity pairRoom) {
        if (!pairRoomMemberRepository.existsByPairRoomAndMember(pairRoom, member)) {
            throw new PairRoomMemberNotJoinException("입력된 페어룸, 사용자가 서로 참조되어 있지 않습니다.");
        }
    }

    private void createRetrospect(
            final PairRoomEntity pairRoom,
            final Member member,
            final List<String> answers
    ) {
        final RetrospectContents retrospectContents = RetrospectContents.of(answers);
        final Retrospect retrospect = new Retrospect(pairRoom.toDomain(), member, retrospectContents);
        final RetrospectEntity savedRetrospectEntity = retrospectRepository.save(
                new RetrospectEntity(pairRoom, member));
        createRetrospectContents(retrospect, savedRetrospectEntity);
    }

    private void createRetrospectContents(final Retrospect retrospect, final RetrospectEntity retrospectEntity) {
        final List<RetrospectContentEntity> retrospectContentEntities = retrospect.getContents().getValues()
                .stream()
                .map(retrospectContent -> new RetrospectContentEntity(
                        retrospectEntity,
                        retrospectContent.getQuestionType(),
                        retrospectContent.getAnswer().getValue()))
                .toList();
        retrospectContentRepository.saveAll(retrospectContentEntities);
    }

    public List<Retrospect> findAllRetrospectsByMember(final String credentialToken) {
        final Member member = findMember(credentialToken);
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
        final Member client = findMember(credentialToken);
        if (retrospectEntity.getMember() != client) {
            throw new NotRetrospectOwnerAccessException("본인 소유가 아닌 회고는 삭제할 수 없습니다.");
        }
    }

    public boolean existRetrospectWithPairRoom(final String credentialToken, final String pairRoomAccessCode) {
        final Member member = findMember(credentialToken);
        final PairRoomEntity pairRoom = findPairRoom(pairRoomAccessCode);
        return retrospectRepository.existsByMemberAndPairRoom(member, pairRoom);
    }
}
