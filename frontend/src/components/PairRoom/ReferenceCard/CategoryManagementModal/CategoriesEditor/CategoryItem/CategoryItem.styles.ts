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

export const CategoryIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  height: 4.4rem;
`;

export const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`;
