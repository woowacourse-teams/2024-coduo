import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;

  position: fixed;
  top: 15rem;
  left: 4%;

  background-color: ${({ theme }) => theme.color.black[100]};

  @media (width <= 1400px) {
    gap: 1.8rem;

    top: 12rem;
    left: 4%;

    padding: 2rem;
  }

  @media (width <= 1000px) {
    display: none;
  }
`;
