import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

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

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
  text-align: center;
`;
