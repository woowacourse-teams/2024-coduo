import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.$isOpen ? '66rem' : '6rem')};

  white-space: nowrap;

  transition: all 0.3s;
`;

export const Sidebar = styled.div`
  overflow: hidden;
`;
