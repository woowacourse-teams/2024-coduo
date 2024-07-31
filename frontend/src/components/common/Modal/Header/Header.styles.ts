import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary[700]};
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h6};
  color: ${({ theme }) => theme.color.primary[600]};
`;
