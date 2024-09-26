import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 30rem;
  border: 0;
  border-radius: 5px;

  background: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: right;

  &:hover {
    border: 0;

    background: ${({ theme }) => theme.color.black[75]};
    color: ${({ theme }) => theme.color.black[10]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
`;

export const InfoContainer = styled.div`
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

export const RepositoryLink = styled(Link)`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.color.black[65]};
  }
`;
