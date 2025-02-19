import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 1rem;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.9;
`;

export const Image = styled.img`
  width: 80rem;
  margin-top: 1rem;

  object-fit: cover;
  object-position: center;

  @media (width <= 1000px) {
    width: 60rem;
  }
`;
