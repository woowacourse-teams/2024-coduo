import styled from 'styled-components';

export const Title = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.7;
`;

export const Sentence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ParagraphContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

export const ImageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8.5rem;

  margin: 8% 10% 8% 25%;

  @media (width <= 1000px) {
    margin: 8% 17%;
  }
`;
