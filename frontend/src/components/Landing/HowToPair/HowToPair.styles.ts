import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  overflow-x: hidden;

  position: relative;

  padding: 10rem 4rem;

  background: linear-gradient(
    75deg,
    ${({ theme }) => theme.color.secondary[100]},
    ${({ theme }) => theme.color.primary[200]}
  );
  background-color: ${({ theme }) => theme.color.black[10]};
  color: ${({ theme }) => theme.color.black[80]};
  line-height: 1.2;
`;

export const Section = styled.section<{ $textAlign?: 'left' | 'center' | 'right' }>`
  display: flex;
  flex-direction: row;

  width: 100%;
  border-radius: 1rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    word-break: keep-all;
  }

  text-align: ${({ $textAlign = 'left' }) => $textAlign};
`;

export const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;

  & > * {
    flex-basis: 0;

    flex-grow: 1;
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 36rem;
  padding: 2rem 4rem;
  border-radius: 3rem;

  background-color: #ffeeb4;
`;

export const SectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;

export const SectionTitle = styled.h2`
  margin: 2rem 0;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Paragraph = styled.p`
  margin: 1rem 0;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 2;
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.color.primary[700]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Highlighted = styled.span`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Conclusion = styled.p`
  padding-left: 1rem;

  color: ${({ theme }) => theme.color.primary[800]};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 1.5;
  text-align: center;
`;

export const Character = styled.img<{ $right?: string; $bottom?: string; $left?: string }>`
  position: relative;
  right: ${({ $right }) => $right};
  bottom: ${({ $bottom }) => $bottom};
  left: ${({ $left }) => $left};

  width: 36rem;
  height: 36rem;
`;
