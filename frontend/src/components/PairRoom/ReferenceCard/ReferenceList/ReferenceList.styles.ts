import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow-y: auto;

  padding: 2rem;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 3rem;

  li {
    list-style-type: none;
  }

  @media (width < 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const EmptyLayout = styled.div`
  flex-grow: 1;

  padding: 2rem;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
