import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
