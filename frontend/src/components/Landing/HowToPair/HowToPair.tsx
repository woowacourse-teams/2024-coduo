import { Driver, Navigator } from '@/assets';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';

import * as S from './HowToPair.styles';

const HowToPair = () => {
  return (
    <S.Layout id="how-to-pair">
      <ScrollAnimationContainer
        animationDirection="right"
        animationDuration={0.7}
        intersectionObserverOptions={{
          threshold: 0.5,
        }}
      >
        <S.Section $textAlign="center">
          <S.SectionText>
            <S.SectionTitle>페어 프로그래밍이란?</S.SectionTitle>
            <S.Paragraph>
              <S.Highlighted>페어 프로그래밍(Pair Programming)</S.Highlighted>은 두 명의 프로그래머가 한 컴퓨터에서 함께
              작업하며 소프트웨어 코드를 작성하는 협업 방식입니다.
            </S.Paragraph>
            <S.Paragraph>
              페어 프로그래밍에서는 두 사람이 각각 <S.Highlighted>&apos;드라이버&apos;(Driver)</S.Highlighted> 와
              <S.Highlighted> &apos;내비게이터&apos;(Navigator)</S.Highlighted> 역할을 번갈아 가며 수행합니다:
            </S.Paragraph>
          </S.SectionText>
        </S.Section>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer
        animationDirection="left"
        animationDuration={0.7}
        intersectionObserverOptions={{
          threshold: 0.5,
        }}
      >
        <S.TextBoxContainer>
          <S.TextBox>
            <S.Paragraph>
              <S.Strong>드라이버</S.Strong>
              <br /> 실제로 코드를 작성하는 사람으로, <br />
              내비게이터의 설계에 따라
              <br /> 코드를 타이핑합니다.
            </S.Paragraph>
          </S.TextBox>
          <S.TextBox>
            <S.Paragraph>
              <S.Strong>내비게이터</S.Strong>
              <br /> 작성된 코드를 실시간으로 검토하고 <br />
              개선할 부분을 제안하며, <br />
              코드의 전반적인 구조를 설계합니다.
            </S.Paragraph>
          </S.TextBox>
        </S.TextBoxContainer>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer
        animationDirection="right"
        animationDuration={0.7}
        intersectionObserverOptions={{
          threshold: 0.5,
        }}
      >
        <S.Section $textAlign="right">
          <S.Character alt="" src={Navigator} />
          <S.SectionText>
            <S.SectionTitle>왜 페어 프로그래밍을 해야 할까요?</S.SectionTitle>
            <S.Paragraph>
              서로의 대화를 통해 자연스럽게 코드 리뷰가 이루어져
              <S.Highlighted> 오류를 조기에 발견하고 수정</S.Highlighted>할 수 있습니다.
              <br />
              또한 <S.Highlighted>서로 다른 시각</S.Highlighted>에서 문제를 바라보며 더 창의적이고 효율적인 해결책을
              찾을 수 있습니다.
            </S.Paragraph>
          </S.SectionText>
        </S.Section>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer
        animationDirection="left"
        animationDuration={0.7}
        intersectionObserverOptions={{
          threshold: 0.5,
        }}
      >
        <S.Section>
          <S.SectionText>
            <S.SectionTitle>페어 프로그래밍의 방법</S.SectionTitle>
            <S.Paragraph>
              서로 일정한 시간 간격으로 역할을 교환하며 <S.Highlighted>지속적인 대화</S.Highlighted>를 통해 코드의 질을
              향상시킵니다. <br /> 또한 주기적으로 작업 과정을 되돌아보고 개선점을 논의하여 다음 세션에서{' '}
              <S.Highlighted>더 나은 협업</S.Highlighted>을 할 수 있도록 합니다.
            </S.Paragraph>
          </S.SectionText>
          <S.Character alt="" src={Driver} />
        </S.Section>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer
        animationDirection="top"
        animationDuration={0.7}
        intersectionObserverOptions={{
          threshold: 0.5,
        }}
      >
        <S.Conclusion>
          페어 프로그래밍은 단순히 코드를 함께 작성하는 것을 넘어,
          <br /> 협업을 통해 더 나은 코드를 만들어 나가는 과정입니다.
          <br />
          이를 통해 개발자들은 서로 배우고 성장하며, 더 나은 결과를 도출할 수 있습니다.
        </S.Conclusion>
      </ScrollAnimationContainer>
    </S.Layout>
  );
};

export default HowToPair;
