import styled from 'styled-components';

export const Layout = styled.p<{ $color: string; $fontSize: string; $fontWeight: string }>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;
