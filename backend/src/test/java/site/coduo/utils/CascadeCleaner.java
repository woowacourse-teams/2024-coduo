package site.coduo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@Component
public class CascadeCleaner {

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

    public void deleteAllPairRoomCascade() {
        pairRoomMemberRepository.deleteAll();
        timerRepository.deleteAll();
        openGraphRepository.deleteAll();
        referenceLinkRepository.deleteAll();
        categoryRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }
}
