import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  height: calc(100vh - 7rem);
  padding: 20px;

  background-color: #f5f5f5;
`;

export const LogoIconWithTitle = styled.img`
  width: 30rem;
  max-width: 40rem;
  margin: 5rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;

  color: #333;
  font-size: 2.4rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin-bottom: 2rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 40rem;
`;
