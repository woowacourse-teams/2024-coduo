import styled, { css } from 'styled-components';

export const buttonStyle = css`
  width: 9rem;
  height: 2.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ReferenceLinkForm = styled.form`
  position: fixed;
  top: 17rem;
  right: 3rem;
  z-index: 10;

  width: 38.5%;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.black[20]};

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.12);
`;

export const ReferenceLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.h6};
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
