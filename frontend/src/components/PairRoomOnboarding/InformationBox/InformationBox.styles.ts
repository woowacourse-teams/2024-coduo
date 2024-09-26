import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  padding: 2rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Title = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  line-height: 1.6;
`;
