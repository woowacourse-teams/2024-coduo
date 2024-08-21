import styled, { css } from 'styled-components';

export const buttonStyles = css`
  border: 0;

  background: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    border: 0;

    background: ${({ theme }) => theme.color.black[70]};
    color: ${({ theme }) => theme.color.black[10]};
  }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;

  width: 100%;
  height: 4rem;
  padding: 0 1.5rem;
`;

export const GithubLogo = styled.img`
  position: absolute;
  left: -2rem;

  width: 5rem;
  object-fit: cover;
`;
