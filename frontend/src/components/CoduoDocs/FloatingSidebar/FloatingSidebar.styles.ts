import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;

  position: fixed;
  top: 15rem;
  left: 4%;

  background-color: ${({ theme }) => theme.color.black[10]};

  @media (width <= 1400px) {
    gap: 1.8rem;

    top: 12rem;
    left: 4%;

    padding: 2rem;
  }

  @media (width <= 1000px) {
    display: none;
  }
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media (width <= 1400px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;

  padding-left: 15px;

  @media (width <= 1400px) {
    gap: 0.8rem;
  }
`;

export const ContentItem = styled(Link)<{ $isActive: boolean }>`
  position: relative;

  color: ${({ $isActive, theme }) => ($isActive ? theme.color.black[90] : theme.color.black[60])};
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-decoration: none;

  transition: all 0.1s;

  &::before {
    position: absolute;
    top: 0;
    left: -2rem;

    width: 3px;
    height: 145%;

    background-color: ${({ $isActive, theme }) => ($isActive ? theme.color.secondary[500] : theme.color.black[30])};

    transition: all 0.2s;
    content: '';
  }

  @media (width <= 1400px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  @media (width <= 1400px) {
    gap: 0.9rem;
  }
`;
