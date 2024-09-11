import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  position: fixed;
  top: 15rem;
  left: 4%;

  padding: 2.6rem;
  border: 1px solid ${({ theme }) => theme.color.black[40]};
  border-radius: 20px;

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

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  text-decoration: none;

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    color: ${theme.color.black[90]};
    
    &::before {
      position: absolute;
      top: 0;
      left: -1rem;
      width: 3px;
      height: 100%;
      background-color: ${theme.color.secondary[500]};
      content: '';
    }
  `}

  @media (width <= 1400px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
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
