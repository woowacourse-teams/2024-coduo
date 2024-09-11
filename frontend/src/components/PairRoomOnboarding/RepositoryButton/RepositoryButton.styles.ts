import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 28rem;
  border: 0;
  border-radius: 5px 0 0 5px;

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
  align-items: center;
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
  justify-content: center;
  align-items: center;

  width: 3.4rem;
  height: 4rem;
  border-radius: 0 5px 5px 0;

  background: ${({ theme }) => theme.color.black[60]};

  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.color.black[65]};
  }
`;
