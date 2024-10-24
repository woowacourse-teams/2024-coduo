package site.coduo.pairroom.service;

import java.util.List;

import jakarta.annotation.Nullable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.generator.AccessCodeGenerator;
import site.coduo.pairroom.domain.accesscode.generator.EasyAccessCodeGenerator;
import site.coduo.pairroom.domain.accesscode.generator.UUIDAccessCodeGenerator;
import site.coduo.pairroom.exception.DeletePairRoomException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PairRoomService {

    private final PairRoomRepository pairRoomRepository;
    private final TimerRepository timerRepository;
    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final MemberService memberService;
    private final UUIDAccessCodeGenerator uuidAccessCodeGenerator;

    @Transactional
    public String savePairRoom(final PairRoomCreateRequest request, @Nullable final String loginToken) {
        final PairRoom pairRoom = createPairRoom(request);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));

        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        if (isRegisteredMember(loginToken)) {
            final Member member = memberService.findMemberByCredential(loginToken);
            pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        }
        if (isRegisteredMember(request.pairId())) {
            final Member member = memberService.findMember(request.pairId());
            pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        }
        return pairRoom.getAccessCodeText();
    }

    private boolean isRegisteredMember(final String value) {
        return value != null;
    }

    public boolean existsByAccessCode(final String accessCode) {
        return pairRoomRepository.existsByAccessCodeAndStatusNot(accessCode, PairRoomStatus.DELETED);
    }

    private PairRoom createPairRoom(final PairRoomCreateRequest request) {
        final AccessCode uuidAccessCode = generateAccessCode(uuidAccessCodeGenerator);
        final AccessCode easyAccessCode = generateAccessCode(
                new EasyAccessCodeGenerator(request.driver(), request.navigator())
        );
        final PairRoomStatus status = PairRoomStatus.IN_PROGRESS;
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        final MissionUrl missionUrl = new MissionUrl(request.missionUrl());
        return new PairRoom(status, pair, missionUrl, uuidAccessCode, easyAccessCode);
    }

    private AccessCode generateAccessCode(final AccessCodeGenerator accessCodeGenerator) {
        final String generatedAccessCode = accessCodeGenerator.generate();
        if (isAlreadyExistAccessCode(accessCodeGenerator, generatedAccessCode)) {
            return generateAccessCode(accessCodeGenerator);
        }
        return new AccessCode(generatedAccessCode);
    }

    private boolean isAlreadyExistAccessCode(final AccessCodeGenerator accessCodeGenerator,
                                             final String generatedAccessCode) {
        if (accessCodeGenerator.isEasyAccessCodeGenerator()) {
            return pairRoomRepository.existsByEasyAccessCode(generatedAccessCode);
        }
        return pairRoomRepository.existsByAccessCode(generatedAccessCode);
    }

    @Transactional
    public void updateNavigatorWithDriver(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkDeletePairRoom(pairRoomEntity);
        pairRoomEntity.swapNavigatorWithDriver();
    }

    private void checkDeletePairRoom(final PairRoomEntity pairRoomEntity) {
        if (pairRoomEntity.isDelete()) {
            throw new DeletePairRoomException("삭제된 페어룸입니다.");
        }
    }

    @Transactional
    public void updatePairRoomStatus(final String accessCode, final String statusName) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkDeletePairRoom(pairRoomEntity);
        final PairRoomStatus status = PairRoomStatus.findByName(statusName);
        pairRoomEntity.updateStatus(status);
    }

    public PairRoomReadResponse findPairRoomAndTimer(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkDeletePairRoom(pairRoomEntity);
        final TimerEntity timerEntity = timerRepository.fetchTimerByPairRoomEntity(pairRoomEntity);
        return PairRoomReadResponse.of(pairRoomEntity.toDomain(), timerEntity.toDomain());
    }

    public List<PairRoomMemberResponse> findPairRooms(final String token) {
        final Member member = memberService.findMemberByCredential(token);

        final List<PairRoomMemberEntity> pairRooms = pairRoomMemberRepository.findByMember(member);
        final List<PairRoomEntity> pairRoomEntities = pairRooms.stream()
                .map(PairRoomMemberEntity::getPairRoom)
                .filter(pairRoomEntity -> !pairRoomEntity.isDelete())
                .toList();

        return pairRoomEntities.stream()
                .map(PairRoomMemberResponse::from)
                .toList();
    }

    @Transactional
    public void deletePairRoom(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkDeletePairRoom(pairRoomEntity);
        pairRoomEntity.updateStatus(PairRoomStatus.DELETED);
    }

    public boolean existMemberInPairRoom(final String credentialToken, final String pairRoomAccessCode) {
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(pairRoomAccessCode);
        final Member member = memberService.findMemberByCredential(credentialToken);
        return pairRoomMemberRepository.existsByPairRoomAndMember(pairRoom, member);
    }
}
