import styled from 'styled-components';

export const Label = styled.label<{ $color: string; $fontSize: string }>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Layout = styled.div`
  display: flex;
  gap: 1rem;
`;
