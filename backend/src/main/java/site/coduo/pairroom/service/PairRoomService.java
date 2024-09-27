package site.coduo.pairroom.service;

import java.util.List;

import jakarta.annotation.Nullable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeGenerator;
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
        final PairRoomEntity entity = PairRoomEntity.from(pairRoom);
        log.info("Pair ROom entity : {}", entity);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));

        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        if (token != null) {
            final Member member = memberService.findMemberByCredential(token);
            pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        }
        return pairRoom.getAccessCodeText();
    }

    private PairRoom createPairRoom(final PairRoomCreateRequest request) {
        final AccessCode accessCode = generateAccessCode();
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        return new PairRoom(status, pair, accessCode);
    }

    private AccessCode generateAccessCode() {
        final String generatedAccessCode = uuidAccessCodeGenerator.generate();
        log.info("ACCESS CODE : {}", generatedAccessCode);
        if (pairRoomRepository.existsByAccessCode(generatedAccessCode)) {
            return generateAccessCode();
        }
        return new AccessCode(generatedAccessCode);
    }

    @Transactional
    public void updateNavigatorWithDriver(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.swapNavigatorWithDriver();
    }

    @Transactional
    public void updatePairRoomStatus(final String accessCode, final String statusName) {
        final PairRoomStatus status = PairRoomStatus.findByName(statusName);
        final PairRoomEntity entity = pairRoomRepository.fetchByAccessCode(accessCode);
        entity.updateStatus(status);
    }

    public PairRoomReadResponse findPairRoomAndTimer(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId());
        return PairRoomReadResponse.of(pairRoomEntity.toDomain(), timerEntity.toDomain());
    }

    public List<PairRoomMemberResponse> findPairRooms(final String token) {
        final Member member = memberService.findMemberByCredential(token);

        final List<PairRoomMemberEntity> pairRooms = pairRoomMemberRepository.findByMember(member);

        return pairRooms.stream()
                .map(PairRoomMemberEntity::getPairRoom)
                .map(PairRoomMemberResponse::from)
                .toList();
    }
}
