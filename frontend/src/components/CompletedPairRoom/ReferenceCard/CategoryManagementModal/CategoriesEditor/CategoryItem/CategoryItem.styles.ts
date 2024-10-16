import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  width: 100%;
  height: 6rem;

  cursor: pointer;

  img {
    width: 2rem;
  }
`;
