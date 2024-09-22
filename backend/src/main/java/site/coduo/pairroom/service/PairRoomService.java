package site.coduo.pairroom.service;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.Member;
import site.coduo.member.service.MemberService;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.AccessCodeFactory;
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeStrategy;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.pairroommember.repository.PairRoomMemberEntity;
import site.coduo.pairroommember.repository.PairRoomMemberRepository;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PairRoomService {

    private final PairRoomRepository pairRoomRepository;
    private final TimerRepository timerRepository;
    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final MemberService memberService;

    @Transactional
    public String saveNonMemberPairRoom(final PairRoomCreateRequest request) {
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(PairRoomEntity::getAccessCode)
                .map(AccessCode::new)
                .toList();

        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());
        final PairRoom pairRoom = new PairRoom(status, pair, accessCodeFactory.generate(accessCodes));

        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));
        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));
        return pairRoom.getAccessCodeText();
    }

    @Transactional
    public void updateNavigatorWithDriver(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.swapNavigatorWithDriver();
    }

    @Transactional
    public void updatePairRoomStatus(final String accessCode, final String statusName) {
        final PairRoomStatus status = PairRoomStatus.findByName(statusName);
        final site.coduo.pairroom.repository.PairRoomEntity entity = pairRoomRepository.fetchByAccessCode(accessCode);
        entity.updateStatus(status);
    }

    public PairRoomReadResponse findByAccessCode(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        return PairRoomReadResponse.of(pairRoomEntity.toDomain(), pairRoomEntity.getId());
    }

    @Transactional
    public String saveMemberPairRoom(final @Valid PairRoomCreateRequest request, final String token) {
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(PairRoomEntity::getAccessCode)
                .map(AccessCode::new)
                .toList();

        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());
        final PairRoom pairRoom = new PairRoom(status, pair, accessCodeFactory.generate(accessCodes));

        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));
        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));
        final Member member = memberService.findMemberByCredential(token);
        pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        return pairRoom.getAccessCodeText();
    }
}
