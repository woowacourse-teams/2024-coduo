import styled from 'styled-components';

export const Layout = styled.div<{ $isDraggedOver: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({ $isDraggedOver, theme }) =>
    $isDraggedOver ? theme.color.secondary[200] : theme.color.secondary[100]};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: background 0.2s ease;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.secondary[150]};
  }
`;

export const Divider = styled.div`
  height: 0.3rem;

  background: ${({ theme }) => theme.color.black[30]};
`;
