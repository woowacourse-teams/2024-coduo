import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';
import ContentBox from '@/components/CoduoDocs/FloatingSidebar/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSIdebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';
import SourceCode from '@/components/CoduoDocs/SourceCode/SourceCode';

import useHashScroll from '@/hooks/Scroll/useHashScroll';

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
            information="3. branch 생성하기"
            src={DOCS_IMAGES.createBranch}
            alt="create-branch"
            webpSrc={DOCS_IMAGES.createBranchWebp}
          >
            <Quote
              text="미션 리포지토리에 생성할 branch 이름을 적고, ‘브랜치 생성하기’ 버튼을 눌러주세요. branch 이름은 자신의
              깃허브 ID 로 작성해주세요."
            />
          </DocsImage>
          <DocsImage
            information="4. 생성한 branch 확인하기"
            src={DOCS_IMAGES.checkBranchCreated}
            alt="check-branch-created"
            webpSrc={DOCS_IMAGES.checkBranchCreatedWebp}
          >
            <Quote text="미션 리포지토리에서 자신의 branch가 생성되었는지 확인해주세요" />
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
            information="4. 역할 선택하기"
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
            information="6. 타이머 설정하기"
            id={START_CONTENT[5].id}
            src={DOCS_IMAGES.setTimer}
            alt="set-timer"
            webpSrc={DOCS_IMAGES.setTimerWebp}
          ></DocsImage>
        </S.ImageContainer>

        <S.ParagraphContainer>
          <S.Title>페어 프로그래밍에 대해</S.Title>
          <S.Subtitle id={ABOUT_PAIR_PROGRAMMING[0].id}>페어프로그래밍이란?</S.Subtitle>
          <S.Subtitle id={ABOUT_PAIR_PROGRAMMING[1].id}>페어룸 이란?</S.Subtitle>
        </S.ParagraphContainer>
      </S.Layout>
    </>
  );
};

export default CoduoDocs;
