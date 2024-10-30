import styled, { css } from 'styled-components';

export const confirmButtonStyles = css`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const cancelButtonStyles = css`
  border-color: ${({ theme }) => theme.color.black[400]};

  background-color: ${({ theme }) => theme.color.black[400]};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    border-color: ${({ theme }) => theme.color.black[500]};

    background-color: ${({ theme }) => theme.color.black[500]};
  }

  &:active {
    border-color: ${({ theme }) => theme.color.black[500]};

    background-color: ${({ theme }) => theme.color.black[500]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  width: 100%;
`;

export const Container = styled.div<{ $type: 'SUCCESS' | 'DANGER' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem 0 3.4rem;

  color: ${({ theme, $type }) => ($type === 'SUCCESS' ? theme.color.success[700] : theme.color.danger[600])};
  font-size: ${({ theme }) => theme.fontSize.md};

  p {
    color: ${({ theme }) => theme.color.black[900]};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;
