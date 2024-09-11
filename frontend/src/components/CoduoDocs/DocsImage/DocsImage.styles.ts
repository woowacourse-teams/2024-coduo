import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const Contents = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const Image = styled.img`
  width: 90rem;
  height: 50rem;
  object-fit: cover;
  object-position: center;

  /* TODO: 스크린 사이즈가 줄었을때 똑같이 가운데 기준으로 크기 자를 지 아니면 크기가 그대로 줄어들지 */
  @media (width <= 1000px) {
    width: 60rem;
    height: 30rem;
  }
`;
