import styled, { css } from 'styled-components';

export const Layout = styled.div<{ $columns: number }>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: ${({ $columns }) => ($columns > 2 ? 'center' : '')};
  gap: 1rem;
  overflow-y: auto;

  padding: 3rem;
`;

export const List = styled.ul<{ $columns: number }>`
  gap: 3rem 0;

  width: 100%;
  padding: 0;

  ${({ $columns }) =>
    $columns <= 2
      ? css`
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        `
      : css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
          place-items: center;
        `}

  li {
    list-style-type: none;
  }
`;

export const EmptyLayout = styled.div`
  flex-grow: 1;

  height: 0;
  padding: 2rem;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
