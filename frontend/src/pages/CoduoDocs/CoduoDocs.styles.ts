import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  margin: 6rem 10% 8rem 25%;

  @media (width <= 1000px) {
    margin: 4rem 17% 8rem;
  }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Content = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.9;
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Sentence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
