import * as S from './HowToPair.styles';

const HowToPair = () => {
  const sections = [
    {
      title: '페어 프로그래밍이란?',
      content: (
        <>
          <S.Paragraph>
            페어 프로그래밍(Pair Programming)은 두 명의 프로그래머가 한 컴퓨터에서 함께 작업하며 소프트웨어 코드를
            작성하는 협업 방식입니다.
            <br /> 이 방법은 1990년대 후반에 &apos;익스트림 프로그래밍&apos;(Extreme Programming)이라는 소프트웨어 개발
            방법론의 일부로 널리 알려지게 되었습니다.
          </S.Paragraph>
          <S.Paragraph>
            페어 프로그래밍에서는 두 사람이 각각 &apos;드라이버&apos;(Driver)와 &apos;내비게이터&apos;(Navigator) 역할을
            번갈아 가며 수행합니다:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Strong>드라이버:</S.Strong> 실제로 코드를 작성하는 사람으로, 키보드와 마우스를 사용해 코드를
              타이핑합니다.
            </S.ListItem>
            <S.ListItem>
              <S.Strong>내비게이터:</S.Strong> 작성된 코드를 실시간으로 검토하고 개선할 부분을 제안하며, 코드의 전반적인
              구조와 논리를 생각합니다.
            </S.ListItem>
          </S.List>
          <S.Paragraph>이 과정에서 두 사람은 지속적으로 소통하며 문제를 해결해 나갑니다.</S.Paragraph>
        </>
      ),
    },
    {
      title: '페어 프로그래밍의 필요성',
      content: (
        <S.List>
          <S.ListItem>
            <S.Strong>코드 품질 향상:</S.Strong> 두 사람이 함께 작업하면서 자연스럽게 코드 리뷰가 이루어져, 오류를
            조기에 발견하고 수정할 수 있습니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>생산성 증가:</S.Strong> 두 사람이 함께 문제를 해결하므로, 혼자서 작업할 때보다 더 빠르게 문제를
            파악하고 해결할 수 있습니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>지식 공유와 학습:</S.Strong> 경험 많은 개발자와 초보 개발자가 함께 작업하면, 서로에게 도움이 되는
            학습 기회가 됩니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>팀워크 강화:</S.Strong> 지속적인 소통과 협력을 통해 팀원 간의 유대감이 강화됩니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>문제 해결 능력 향상:</S.Strong> 서로 다른 시각에서 문제를 바라보며 더 창의적이고 효율적인 해결책을
            찾을 수 있습니다.
          </S.ListItem>
        </S.List>
      ),
    },
    {
      title: '페어 프로그래밍의 방법',
      content: (
        <S.List>
          <S.ListItem>
            <S.Strong>역할 교환:</S.Strong> 드라이버와 내비게이터는 일정한 주기마다 역할을 교환합니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>적극적인 소통:</S.Strong> 두 사람 간의 지속적인 대화를 통해 코드의 질을 향상시킵니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>작은 단위로 작업:</S.Strong> 코드를 작은 단위로 나누어 작업하여 오류를 조기에 발견하고 수정합니다.
          </S.ListItem>
          <S.ListItem>
            <S.Strong>정기적인 회고와 개선:</S.Strong> 작업 과정을 되돌아보고 개선점을 논의하여 다음 세션에서 더 나은
            협업을 할 수 있도록 합니다.
          </S.ListItem>
        </S.List>
      ),
    },
  ];

  return (
    <S.Layout>
      <S.Title>페어 프로그래밍: What, Why, How</S.Title>

      {sections.map((section, index) => (
        <S.Section key={index}>
          <S.SectionTitle>{section.title}</S.SectionTitle>
          {section.content}
        </S.Section>
      ))}

      <S.Conclusion>
        페어 프로그래밍은 단순히 코드를 함께 작성하는 것을 넘어서, 협업을 통해 더 나은 소프트웨어를 만들어 나가는
        과정입니다.
        <br /> 이를 통해 개발자들은 서로 배우고 성장하며, 더 나은 결과를 도출할 수 있습니다.
      </S.Conclusion>
    </S.Layout>
  );
};

export default HowToPair;
