package site.coduo.retrospect.service;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContents;
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
                .orElseThrow(() -> new EntityNotFoundException(
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
            throw new IllegalArgumentException("입력된 페어룸, 사용자가 서로 참조되어 있지 않습니다.");
        }
    }

    private void createRetrospect(
            final PairRoomEntity pairRoom,
            final Member member,
            final List<String> answers
    ) {
        final RetrospectContents retrospectContents = RetrospectContents.of(answers);
        final Retrospect retrospect = new Retrospect(pairRoom.toDomain(), member, retrospectContents);
        final RetrospectEntity savedRetrospectEntity = retrospectRepository.save(new RetrospectEntity(pairRoom, member));
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
}
