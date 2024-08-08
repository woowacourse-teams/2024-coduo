import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  padding: 2rem;

  background-color: ${({ theme }) => theme.color.primary[100]};
  border-radius: 1rem;
`;

export const Title = styled.p`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary[700]};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  line-height: 1.6;
  color: ${({ theme }) => theme.color.black[70]};
`;
