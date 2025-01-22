import styled from 'styled-components';

export const Layout = styled.div<{ $gap: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ $gap }) => $gap};

  width: 100%;
`;
