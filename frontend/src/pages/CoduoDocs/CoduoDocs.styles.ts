import styled from 'styled-components';

export const Title = styled.p`
  margin-top: 5rem;

  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Subtitle = styled.p`
  margin-top: 3rem;

  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Content = styled.p`
  gap: 1rem;

  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.9;
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.color.primary[800]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Sentence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  margin: 5% 10% 8% 25%;

  @media (width <= 1000px) {
    margin: 8% 17%;
  }
`;
