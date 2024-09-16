import DocsImage from '@/components/CoduoDocs/DocsImage/DocsImage';
import ContentBox from '@/components/CoduoDocs/FloatingSidebar/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSIdebar';
import Quote from '@/components/CoduoDocs/Quote/Quote';

import useHashScroll from '@/hooks/Scroll/useHashScroll';

import { ABOUT_PAIR_PROGRAMMING, DOCS_IMAGES, START_CONTENT } from '@/constants/coduoDocs';

import * as S from './Docs.styles';

const Docs = () => {
  const { activeSection, handleActiveSection } = useHashScroll();

  return (
    <>
      <FloatingSidebar>
        <ContentBox
          handleActiveSection={handleActiveSection}
          activeSection={activeSection}
          title="시작하기"
          contents={START_CONTENT}
        />
        <ContentBox
          handleActiveSection={handleActiveSection}
          activeSection={activeSection}
          title="페어 프로그래밍에 대해"
          contents={ABOUT_PAIR_PROGRAMMING}
        />
      </FloatingSidebar>

      <S.Layout>
        <S.ParagraphContainer>
          <S.Title>코딩해듀오 시작하기</S.Title>
          <S.Content>
            코딩해듀오 문서에 오신 것을 환영합니다! 코딩해듀오는 페어 프로그래밍을 처음 접하는 초보자가 페어
            프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다. 여기에서는 코딩해듀오를 어떻게 시작할 수
            있는지 소개합니다.
          </S.Content>
          <S.Sentence>
            <S.Content>코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.</S.Content>
            <Quote to="#start-free" linkText="여기부터 읽기" text="미션 없이 자유롭게 시작하려면?" />
          </S.Sentence>
        </S.ParagraphContainer>

        <S.ImageContainer id={START_CONTENT[0].id}>
          <S.ParagraphContainer>
            <S.SubTitle>미션과 함께 시작하기</S.SubTitle>
            <Quote
              to="https://velog.io/@imnotmoon/React-Suspense-ErrorBoundary-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0"
              linkText="미션 리포지토리로 이동"
              text="미션 리포지토리에서 미션을 미리 확인해 보세요."
            />
          </S.ParagraphContainer>
          <DocsImage
            information="1. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다"
            src={DOCS_IMAGES.createRoom}
            alt="create-room"
            webpSrc={DOCS_IMAGES.createRoom}
          />
          <DocsImage
            information="2. 미션과 함께 시작하기"
            src={DOCS_IMAGES.startWithMission}
            alt="start-with-mission"
            webpSrc={DOCS_IMAGES.startWithMissionWebp}
          />
          <DocsImage
            information="3. 미션 선택하기"
            src={DOCS_IMAGES.selectMission}
            alt="check-branch-created"
            webpSrc={DOCS_IMAGES.selectMissionWebp}
          />
          <DocsImage
            information="4. branch 생성하기"
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
            information="5. 생성한 branch 확인하기"
            src={DOCS_IMAGES.checkBranchCreated}
            alt="check-branch-created"
            webpSrc={DOCS_IMAGES.checkBranchCreatedWebp}
          >
            <Quote text="미션 리포지토리에서 자신의 branch가 생성되었는지 확인해주세요" />
          </DocsImage>
          <DocsImage
            information="6. fork 하기"
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
            information="7. 로컬로 clone 하기"
            src={DOCS_IMAGES.clone}
            alt="clone"
            webpSrc={DOCS_IMAGES.cloneWebp}
          >
            <Quote text="Github 리포지토리 주소와 아래 명령어를 통해 자신의 컴퓨터에 미션 코드를 불러오세요." />
          </DocsImage>
          <Quote text="터미널을 열어 미션을 진행하고 싶은 폴더 위치에서 아래의 명령어를 실행해주세요." />
          TODO: 여기에 명령어 입력 및 복사할 수 있는 컴포넌트 구현해서 넣기
        </S.ImageContainer>

        <S.ImageContainer id={START_CONTENT[1].id}>
          <S.ParagraphContainer>
            <S.SubTitle>자유롭게 시작하기</S.SubTitle>
            <DocsImage
              information="1. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다"
              src={DOCS_IMAGES.startFree}
              alt="start-free"
              webpSrc={DOCS_IMAGES.startFreeWebp}
            ></DocsImage>
          </S.ParagraphContainer>
        </S.ImageContainer>
        <div id={START_CONTENT[2].id}>
          <DocsImage
            information="2. 사용할 이름을 입력해 주세요"
            src={DOCS_IMAGES.inputName}
            alt="input-name"
            webpSrc={DOCS_IMAGES.inputNameWebp}
          ></DocsImage>
          <DocsImage
            information="3. 페어의 이름을 입력해 주세요"
            src={DOCS_IMAGES.inputPairName}
            alt="input-pair-name"
            webpSrc={DOCS_IMAGES.inputPairNameWebp}
          ></DocsImage>
        </div>
        <div id={START_CONTENT[3].id}>
          <DocsImage
            information="4. 역할을 선택해 주세요"
            src={DOCS_IMAGES.setRole}
            alt="set-role"
            webpSrc={DOCS_IMAGES.setRoleWebp}
          ></DocsImage>
          <DocsImage src={DOCS_IMAGES.selectDriver} alt="select-driver" webpSrc={DOCS_IMAGES.selectDriverWebp}>
            <Quote text="5. 드라이버를 선택해주세요" />
          </DocsImage>
        </div>
        <div id={START_CONTENT[4].id}>
          <DocsImage
            information="6. 타이머를 설정해주세요"
            src={DOCS_IMAGES.setTimer}
            alt="set-timer"
            webpSrc={DOCS_IMAGES.setTimerWebp}
          ></DocsImage>
        </div>
      </S.Layout>
    </>
  );
};

export default Docs;
