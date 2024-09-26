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
import site.coduo.pairroom.domain.accesscode.AccessCodeFactory;
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeStrategy;
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

    @Transactional
    public String savePairRoom(final PairRoomCreateRequest request, @Nullable final String token) {
        log.info("2. Service의 savePairRoom 메서드를 시작했다.");
        log.info("3. Service의 createPairRoom 메서드 실행!");
        final PairRoom pairRoom = createPairRoom(request);
        log.info("4. Service의 createPairRoom 메서드 탈출!!");
        log.info("5. 페어룸 리포지토리 시작!");
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(pairRoom));
        log.info("6. 페어룸 리포지토리 끝!!");

        final Timer timer = new Timer(pairRoom.getAccessCode(), request.timerDuration(), request.timerRemainingTime());
        log.info("7. 타이머 리포지토리 시작!!");
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        log.info("8. 토큰 널 체크 시작!!");
        if (token != null) {
            log.info("9. 리포지토리에서 크래덴셜로 멤버 조회");
            final Member member = memberService.findMemberByCredential(token);
            log.info("10. 페어룸 & 멤버 중간 테이블 save 저장!!");
            pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        }
        log.info("11. 페어룸 AccessToken 문자열 반환하면서 메서드 종료 시도");
        return pairRoom.getAccessCodeText();
    }

    private PairRoom createPairRoom(final PairRoomCreateRequest request) {
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final Pair pair = new Pair(new PairName(request.navigator()), new PairName(request.driver()));
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(PairRoomEntity::getAccessCode)
                .map(AccessCode::new)
                .toList();

        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());
        return new PairRoom(status, pair, accessCodeFactory.generate(accessCodes));
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
