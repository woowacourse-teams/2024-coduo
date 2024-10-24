import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 11rem;
  border-color: ${({ theme }) => theme.color.secondary[600]};

  color: ${({ theme }) => theme.color.secondary[600]};

  &:hover {
    border-color: ${({ theme }) => theme.color.secondary[700]};

    color: ${({ theme }) => theme.color.secondary[700]};
  }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
