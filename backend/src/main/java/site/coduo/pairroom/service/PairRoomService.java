package site.coduo.pairroom.service;

import java.util.List;

import jakarta.annotation.Nullable;
import jakarta.persistence.EntityNotFoundException;

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
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeGenerator;
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
    public String savePairRoom(final PairRoomCreateRequest request, @Nullable final String token) {
        final PairRoom pairRoom = createPairRoom(request);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));

        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        if (token != null) {
            final Member member = memberService.findMemberByCredential(token);
            pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        }
        return pairRoom.getAccessCodeText();
    }

    public boolean existsByAccessCode(final String accessCode) {
        return pairRoomRepository.existsByAccessCodeAndStatusNot(accessCode, PairRoomStatus.DELETED);
    }

    private PairRoom createPairRoom(final PairRoomCreateRequest request) {
        final AccessCode accessCode = generateAccessCode();
        final PairRoomStatus status = PairRoomStatus.IN_PROGRESS;
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        final MissionUrl missionUrl = new MissionUrl(request.missionUrl());
        return new PairRoom(status, pair, missionUrl, accessCode);
    }

    private AccessCode generateAccessCode() {
        final String generatedAccessCode = uuidAccessCodeGenerator.generate();
        if (pairRoomRepository.existsByAccessCode(generatedAccessCode)) {
            return generateAccessCode();
        }
        return new AccessCode(generatedAccessCode);
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
        final PairRoomEntity pairRoom = findPairRoom(pairRoomAccessCode);
        final Member member = memberService.findMemberByCredential(credentialToken);
        return pairRoomMemberRepository.existsByPairRoomAndMember(pairRoom, member);
    }

    private PairRoomEntity findPairRoom(final String pairRoomAccessCode) {
        if (pairRoomAccessCode == null || pairRoomAccessCode.isEmpty()) {
            throw new IllegalArgumentException("페어룸 접근 코드로 null 혹은 빈 값이 입력될 수 없습니다.");
        }

        return pairRoomRepository.findByAccessCode(pairRoomAccessCode)
                .orElseThrow(() -> new EntityNotFoundException(
                        "입력된 페어룸 접근 코드에 대응되는 페어룸이 존재하지 않습니다. - " + pairRoomAccessCode));
    }
}
