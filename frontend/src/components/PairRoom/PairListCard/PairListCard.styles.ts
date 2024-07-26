import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isOpen ? '66rem' : '6rem')};
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  white-space: nowrap;
`;

export const Sidebar = styled.div`
  overflow: hidden;
`;
