import styled from 'styled-components';

export const Layout = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  align-items: center;

  padding: 2rem;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-grow: 1;
  gap: 3rem;

  li {
    list-style-type: none;
  }

  @media (width < 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.black[60]};
`;
