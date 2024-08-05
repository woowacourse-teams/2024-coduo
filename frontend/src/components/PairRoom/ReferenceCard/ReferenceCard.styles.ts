import styled, { css } from 'styled-components';

export const Layout = styled.div`
  flex: 1;
  min-width: 49rem;
  max-height: calc(100vh - 13rem);
`;

export const buttonStyle = css`
  width: 9rem;
  height: 2.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ReferenceLinkForm = styled.form`
  overflow-y: auto;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  width: 80%;
`;

export const ReferenceLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: all 0.1s;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const ReferenceListContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 23rem);
  padding: 3rem;
`;

export const ReferenceList = styled.ul`
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

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.black[60]};
`;
