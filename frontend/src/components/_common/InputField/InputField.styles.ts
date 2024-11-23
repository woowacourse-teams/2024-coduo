import styled from 'styled-components';

export const Layout = styled.div<{ $height: string; $width: string; $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;
