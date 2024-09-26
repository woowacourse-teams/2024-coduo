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
  gap: 1rem;

  width: 26rem;

  cursor: pointer;

  img {
    width: 2rem;
  }
`;

export const CategoryIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`;
