import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  width: 100%;
  height: 7rem;
  background-color: ${({ $isOpen, theme }) => ($isOpen ? theme.color.black[30] : 'white')};
  padding: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
`;

export const RoomCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

export const RoomCodeTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.black[70]};
  height: 2rem;
`;

export const RoomCode = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
`;
