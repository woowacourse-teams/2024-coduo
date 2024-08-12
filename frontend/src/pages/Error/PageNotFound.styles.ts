import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  height: 100vh;
  padding: 10rem;

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: bold;
`;

export const Description = styled.p`
  margin-bottom: 2rem;

  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
  color: ${({ theme }) => theme.color.primary[800]};
  text-align: center;
`;
