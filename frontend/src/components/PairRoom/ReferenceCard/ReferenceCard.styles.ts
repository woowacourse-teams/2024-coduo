import styled, { css } from 'styled-components';

export const buttonStyle = css`
  width: 9rem;
  height: 2.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ReferenceLinkForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 2rem;
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

export const ReferenceList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    list-style-type: none;
  }
  margin: 3rem 3rem;

  gap: 1rem;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
