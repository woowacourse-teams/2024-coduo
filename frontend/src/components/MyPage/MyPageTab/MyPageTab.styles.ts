import styled from 'styled-components';

export const Tab = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 20rem;
  padding-bottom: 1rem;

  cursor: pointer;

  p {
    color: ${({ theme }) => theme.color.black[800]};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  ${({ theme, $isActive }) =>
    $isActive &&
    `
      border-bottom: 2px solid ${theme.color.primary[800]};
      
      p {
        color: ${theme.color.primary[800]};
      }
    `}
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 12rem;

  width: 100%;
`;
