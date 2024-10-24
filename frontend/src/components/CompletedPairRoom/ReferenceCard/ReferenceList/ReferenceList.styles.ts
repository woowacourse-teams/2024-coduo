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

export const Item = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 17rem;
  height: 20rem;
  border: 1px solid ${({ theme }) => theme.color.black[30]};
  border-radius: 1.5rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 10rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const EmptyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 10rem;

  background-color: ${({ theme }) => theme.color.black[40]};
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.3;

  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;

  width: 100%;
  height: 10rem;
  max-height: 12rem;
  padding: 1.5rem;

  cursor: pointer;
`;

export const Title = styled.p`
  overflow: hidden;

  width: 100%;

  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export const Content = styled.p`
  display: -webkit-box;
  overflow: hidden;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
