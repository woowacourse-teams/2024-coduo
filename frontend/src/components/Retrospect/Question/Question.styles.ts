import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
