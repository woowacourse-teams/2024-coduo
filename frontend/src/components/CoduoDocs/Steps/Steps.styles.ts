import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 3rem;
`;
export const Contents = styled.p`
  color: ${({ theme }) => theme.color.black[900]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Image = styled.img`
  width: 80rem;

  object-fit: cover;
  object-position: center;

  @media (width <= 1000px) {
    width: 60rem;
  }
`;
