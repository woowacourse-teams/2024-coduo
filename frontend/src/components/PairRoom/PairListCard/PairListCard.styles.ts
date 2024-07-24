import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isOpen ? '16vw' : '6rem')};
  min-width: ${(props) => (props.$isOpen ? '20rem' : '6rem')};
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  white-space: nowrap;
`;

export const Sidebar = styled.div`
  overflow: hidden;
`;
