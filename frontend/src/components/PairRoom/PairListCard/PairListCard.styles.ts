import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: ${(props) => (props.$isOpen ? '26rem' : '6rem')};

  white-space: nowrap;

  transition: all 0.3s;
`;

export const Sidebar = styled.div`
  overflow: hidden;
`;
