import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.lg};

  border-bottom: ${({ $isOpen, theme }) => $isOpen && `1px solid ${theme.color.black[30]}`};
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
