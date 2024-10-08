import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';
import ContentBox from '@/components/CoduoDocs/FloatingSidebar/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSidebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';
import SourceCode from '@/components/CoduoDocs/SourceCode/SourceCode';

import useHashScroll from '@/hooks/common/useHashScroll';

import { ABOUT_PAIR_PROGRAMMING, DOCS_IMAGES, START_CONTENT } from '@/constants/coduoDocs';

import * as S from './CoduoDocs.styles';

const CoduoDocs = () => {
  const { activeSection } = useHashScroll();

  return (
    <>
      <FloatingSidebar>
        <ContentBox activeSection={activeSection} title="시작하기" contents={START_CONTENT} />
        <ContentBox activeSection={activeSection} title="페어 프로그래밍에 대해" contents={ABOUT_PAIR_PROGRAMMING} />
      </FloatingSidebar>

      <S.Layout>
        <S.ParagraphContainer aria-labelledby={START_CONTENT[0].id}>
          <S.Title id={START_CONTENT[0].id}>코딩해듀오 시작하기</S.Title>
          <S.Content>
            코딩해듀오 문서에 오신 것을 환영합니다! 코딩해듀오는 페어 프로그래밍을 처음 접하는 사용자가 페어
            프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다. 여기에서는 코딩해듀오를 어떻게 시작할 수
            있는지 소개합니다.
          </S.Content>

          <DocsImage
            information="1. 방 생성하기"
            src={DOCS_IMAGES.createRoom}
            alt="create-room"
            webpSrc={DOCS_IMAGES.createRoomWebp}
          >
            <Quote text="가장 먼저 방을 생성해주세요. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다" />
          </DocsImage>

          <S.Sentence>
            <S.Content>코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.</S.Content>

            <Quote href="#start-free" linkText="여기부터 읽기" text="미션 없이 자유롭게 시작하려면?" />
          </S.Sentence>
        </S.ParagraphContainer>

        <S.ImageContainer aria-labelledby={START_CONTENT[1].id}>
          <S.ParagraphContainer>
            <S.Subtitle id={START_CONTENT[1].id}>미션과 함께 시작하기</S.Subtitle>
            <Quote
              href="https://github.com/coduo-missions"
              linkText="미션 리포지토리로 이동"
              text="미션 리포지토리에서 미션을 미리 확인해 보세요."
              isNewBrowserOpen={true}
            />
          </S.ParagraphContainer>
          <DocsImage
            information="1. 미션과 함께 시작하기"
            src={DOCS_IMAGES.startWithMission}
            alt="start-with-mission"
            webpSrc={DOCS_IMAGES.startWithMissionWebp}
          />
          <DocsImage
            information="2. 미션 선택하기"
            src={DOCS_IMAGES.selectMission}
            alt="check-branch-created"
            webpSrc={DOCS_IMAGES.selectMissionWebp}
          />
          <DocsImage
            information="3. 브랜치 생성하기"
            src={DOCS_IMAGES.createBranch}
            alt="create-branch"
            webpSrc={DOCS_IMAGES.createBranchWebp}
          >
            <Quote
              text="미션 리포지토리에 생성할 브랜치 이름을 적고, ‘브랜치 생성하기’ 버튼을 눌러주세요. 브랜치 이름은 자신의
              깃허브 ID 로 작성해주세요."
            />
          </DocsImage>
          <DocsImage
            information="4. 생성한 브랜치 확인하기"
            src={DOCS_IMAGES.checkBranchCreated}
            alt="check-branch-created"
            webpSrc={DOCS_IMAGES.checkBranchCreatedWebp}
          >
            <Quote text="미션 리포지토리에서 자신의 브랜치가 생성되었는지 확인해주세요" />
          </DocsImage>
          <DocsImage
            information="5. fork 하기"
            src={DOCS_IMAGES.forkRepository}
            alt="fork-repository"
            webpSrc={DOCS_IMAGES.forkRepositoryWebp}
          >
            <Quote text="상단의 fork 버튼을 눌러 해당 미션을 자신의 리포지토리로 fork 해주세요." />
          </DocsImage>
          <DocsImage src={DOCS_IMAGES.createFork} alt="create-fork" webpSrc={DOCS_IMAGES.createForkWebp}>
            <Quote text="Create Fork 버튼을 눌러주세요." />
          </DocsImage>
          <DocsImage
            information="6. 로컬로 clone 하기"
            src={DOCS_IMAGES.clone}
            alt="clone"
            webpSrc={DOCS_IMAGES.cloneWebp}
          >
            <Quote text="Github 리포지토리 주소와 아래 명령어를 통해 자신의 컴퓨터에 미션 코드를 불러오세요." />
          </DocsImage>
          <Quote text="터미널을 열어 미션을 진행하고 싶은 폴더 위치에서 아래의 명령어를 실행해주세요." />
          <SourceCode
            code={`git clone https://github.com/{생성한 브랜치 이름}/{리포지토리 이름}.git 
ex) git clone https://github.com/honggildong/java-guessing-number.git`}
          ></SourceCode>
          <SourceCode
            code="// clone한 폴더로 이동하는 방법
cd {리포지토리 이름}
ex) cd java-guessing-number"
          ></SourceCode>
          <S.Content>이제 가저온 프로젝트를 본인이 사용하는 통합 개발 환경(IDE)으로 열어 미션을 진행합니다.</S.Content>
        </S.ImageContainer>

        <S.ImageContainer aria-labelledby={START_CONTENT[2].id}>
          <S.ParagraphContainer>
            <S.Subtitle id={START_CONTENT[2].id}>자유롭게 시작하기</S.Subtitle>
            <DocsImage
              information="1. '그냥 시작할래요' 버튼을 누르면 미션 없이 자유롭게 시작할 수 있습니다."
              src={DOCS_IMAGES.startFree}
              alt="start-free"
              webpSrc={DOCS_IMAGES.startFreeWebp}
            ></DocsImage>
          </S.ParagraphContainer>
        </S.ImageContainer>
        <S.ImageContainer aria-labelledby={START_CONTENT[3].id}>
          <DocsImage
            information="2. 이름 입력하기"
            id={START_CONTENT[3].id}
            src={DOCS_IMAGES.inputName}
            alt="input-name"
            webpSrc={DOCS_IMAGES.inputNameWebp}
          >
            <Quote text="나의 이름을 입력해 주세요" />
          </DocsImage>
          <DocsImage src={DOCS_IMAGES.inputPairName} alt="input-pair-name" webpSrc={DOCS_IMAGES.inputPairNameWebp}>
            <Quote text="페어의 이름을 입력해 주세요" />
          </DocsImage>
        </S.ImageContainer>
        <S.ImageContainer aria-labelledby={START_CONTENT[4].id}>
          <DocsImage
            information="3. 역할 선택하기"
            id={START_CONTENT[4].id}
            src={DOCS_IMAGES.setRole}
            alt="set-role"
            webpSrc={DOCS_IMAGES.setRoleWebp}
          >
            <Quote text="설명을 참고하여 드라이버와 내비게이터를 정해주세요." />
          </DocsImage>
          <DocsImage src={DOCS_IMAGES.selectDriver} alt="select-driver" webpSrc={DOCS_IMAGES.selectDriverWebp}>
            <Quote text="드라이버를 선택해주세요." />
          </DocsImage>
        </S.ImageContainer>
        <S.ImageContainer aria-labelledby={START_CONTENT[5].id}>
          <DocsImage
            information="4. 타이머 설정하기"
            id={START_CONTENT[5].id}
            src={DOCS_IMAGES.setTimer}
            alt="set-timer"
            webpSrc={DOCS_IMAGES.setTimerWebp}
          ></DocsImage>
        </S.ImageContainer>

        <S.ParagraphContainer>
          <S.Title>페어 프로그래밍에 대해</S.Title>
          <S.Subtitle id={ABOUT_PAIR_PROGRAMMING[0].id}>페어 프로그래밍이란?</S.Subtitle>
          <S.ParagraphContainer>
            <Quote
              text="페어 프로그래밍에 대한 정보는 다음 레퍼런스를 기반으로 작성했습니다."
              linkText="자세한 정보 보기"
              href="https://www.techtarget.com/searchsoftwarequality/definition/Pair-programming"
            />
            <S.Content>
              페어 프로그래밍(Pair Programming)은 두 명의 프로그래머가 한 컴퓨터에서 함께 작업하며 소프트웨어 코드를
              작성하는 협업 방식입니다. 페어 프로그래밍에서는 두 사람이 각각 드라이버(Driver) 와 내비게이터(Navigator)
              역할을 번갈아 가며 수행합니다.
            </S.Content>
            <S.Sentence>
              <S.Content>
                <SourceCode
                  code={`드라이버(Driver)
실제로 코드를 작성하는 사람으로, 키보드와 마우스를 사용해 코드를 타이핑합니다.

내비게이터(Navigator)
작성된 코드를 실시간으로 검토하고 개선할 부분을 제안하며, 코드의 전반적인 구조와 논리를 생각합니다.`}
                ></SourceCode>
              </S.Content>
            </S.Sentence>
            <br />
            <S.Sentence>
              <Quote text="페어 프로그래밍을 효과적으로 수행하려면 다음과 같은 부분들을 유의해야 합니다." />
              <br />
              <S.Content>
                <S.Strong>지속적인 의사소통 유지하기</S.Strong>
                <p>
                  페어 프로그래밍의 핵심은 지속적인 의사소통입니다. 만약 두 개발자 사이에 대화가 없다면, 그들은 아마도
                  사고 과정을 공유하고 있지 않을 것입니다. 드라이버는 코드를 작성하면서 자신의 생각을 말로 표현해야
                  하며, 내비게이터는 적극적으로 의견을 제시하고 질문해야 합니다. 이를 통해 아이디어를 효과적으로
                  교환하고 문제를 함께 해결할 수 있습니다.
                </p>
                <br />
                <S.Strong>역할 정기적으로 교대하기와 코드 자주 커밋하기</S.Strong>
                <p>
                  드라이버와 내비게이터 역할을 일정 간격으로 바꾸는 것이 중요합니다. 이는 개발자 간의 기술 공유를
                  촉진하고 집중력을 유지하는 데 도움이 됩니다. 역할을 전환할 때마다 코드를 커밋하는 것이 좋습니다. 작은
                  단위로 자주 커밋하면 작업 진행 상황을 명확히 할 수 있고, 나중에 코드를 리뷰하거나 문제를 해결할 때
                  유용합니다.
                </p>
                <br />
                <S.Strong>적절한 페어 구성과 익숙한 개발 환경 사용하기</S.Strong>
                <p>
                  페어를 이룰 때는 두 개발자가 원활하게 협력할 수 있는지 신중히 고려해야 합니다. 성격이나 작업 스타일이
                  맞지 않으면 생산성이 떨어질 수 있습니다. 또한, 두 개발자 모두 사용하는 개발 환경에 익숙해야 합니다.
                  그렇지 않으면 페어 프로그래밍의 균형이 깨질 수 있습니다. 필요한 경우, 시작 전에 개발 환경을 함께
                  설정하고 익히는 시간을 가지는 것이 좋습니다.
                </p>
                <br />
                <S.Strong>필요할 때 명확히 설명 요청하기와 적절한 휴식 취하기</S.Strong>
                <p>
                  특히 경험이 적은 개발자가 전문가와 작업할 때는 배울 수 있는 모든 기회를 활용해야 합니다. 이해가 되지
                  않는 부분이 있다면 주저하지 말고 설명을 요청해야 합니다. 동시에, 두 개발자 모두에게 적합한 페이스로
                  작업해야 합니다. 필요할 때는 휴식을 취하여 집중력을 유지하고 생산성을 높일 수 있습니다. 정기적인
                  휴식은 장기적으로 더 효율적인 작업을 가능하게 합니다.
                </p>
                <br />
              </S.Content>
            </S.Sentence>
          </S.ParagraphContainer>

          <S.Subtitle id={ABOUT_PAIR_PROGRAMMING[1].id}>페어룸이란?</S.Subtitle>
          <S.Content>
            <S.Sentence>
              <S.Content>
                <Quote text="코딩해듀오에서는 페어룸을 제공하여 페어 프로그래밍을 더욱 유용하고 쉽게 하도록 도와줍니다."></Quote>
                <br />
                <S.Strong>투두 리스트</S.Strong>
                <p>
                  투두 리스트를 제공하여, 페어가 함께 목표와 할 일을 설정하고 관리할 수 있습니다. 이를 통해 작업의
                  방향성을 명확히 하고 진행 상황을 실시간으로 파악할 수 있습니다. 또한, 우선순위를 설정하여 중요한
                  작업에 집중할 수 있으며, 완료된 작업을 체크하면서 성취감을 느낄 수 있습니다.
                </p>
                <br />
                <S.Strong>레퍼런스</S.Strong>
                <p>
                  페어 프로그래밍 도중 참고한 레퍼런스를 저장할 수 있습니다. 저장된 레퍼런스는 카테고리별로 정리되어
                  나중에 쉽게 찾아볼 수 있어 프로젝트 완료 후에도 학습 자료로 활용할 수 있습니다.
                </p>
                <br />
                <S.Strong>알람 기능</S.Strong>
                <p>
                  설정한 시간이 지나면 역할을 변경할 수 있도록 알람이 울려 적절한 시점에 역할을 교체할 수 있도록
                  돕습니다.
                </p>
                <br />
                <S.Strong>회고</S.Strong>
                <p>
                  페어 프로그래밍 세션이 종료되면 회고를 진행합니다. 이 과정에서 잘된 점, 개선할 점, 배운 점 등을 함께
                  논의하고 기록합니다. 회고 기능은 구조화된 템플릿을 제공하여 효과적인 회고를 가능하게 하며, 이전 회고
                  내용을 쉽게 참조할 수 있어 지속적인 개선이 가능합니다.
                </p>
                <br />
              </S.Content>
            </S.Sentence>
          </S.Content>
        </S.ParagraphContainer>
      </S.Layout>
    </>
  );
};

export default CoduoDocs;
