import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  overflow-x: hidden;

  padding: 10rem 4rem;

  background: linear-gradient(
    75deg,
    ${({ theme }) => theme.color.secondary[50]},
    ${({ theme }) => theme.color.primary[100]}
  );
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.black[800]};
`;

export const TextBoxContainer = styled.div`
  display: flex;
  gap: 8rem;

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
  gap: 1.5rem;

  width: 38rem;
  padding: 4rem;
  border-radius: 3rem;

  background-color: ${({ theme }) => theme.color.secondary[100]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.8;
`;

export const Section = styled.section<{ $textAlign?: 'left' | 'center' | 'right' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

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

export const SectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
`;

export const SectionTitle = styled.h1`
  margin: 2rem 0;

  color: ${({ theme }) => theme.color.primary[900]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.color.black[800]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  line-height: 2.2;
`;

export const Strong = styled.p`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Highlighted = styled.span`
  color: ${({ theme }) => theme.color.primary[800]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Conclusion = styled.p`
  color: ${({ theme }) => theme.color.primary[900]};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.8;
  text-align: center;
`;

export const Character = styled.img`
  width: 32rem;
  height: 32rem;
  margin-top: 2rem;
`;
