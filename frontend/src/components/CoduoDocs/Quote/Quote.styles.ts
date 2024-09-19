import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  text-decoration: none;
`;

export const QuoteBar = styled.span`
  color: ${({ theme }) => theme.color.black[50]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.color.black[90]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.extraLight};
`;

export const TextLink = styled.a`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: underline;

  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.primary[800]};
  }
`;
