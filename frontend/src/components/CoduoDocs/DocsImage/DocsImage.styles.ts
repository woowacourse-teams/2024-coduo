import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const Contents = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Image = styled.img`
  width: 90rem;
  height: 50rem;
  object-fit: cover;
  object-position: center;

  @media (width <= 1000px) {
    width: 60rem;
    height: 30rem;
  }
`;
