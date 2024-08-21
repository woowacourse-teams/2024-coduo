import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.lg};

  cursor: pointer;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
