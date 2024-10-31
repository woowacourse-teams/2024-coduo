import { Link } from 'react-router-dom';

import styled from 'styled-components';

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

  color: ${({ theme }) => theme.color.black[600]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.color.black[600]};
  }
`;
