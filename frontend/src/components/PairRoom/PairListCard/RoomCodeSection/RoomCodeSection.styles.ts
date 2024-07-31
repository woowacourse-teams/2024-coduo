import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};

  width: 100%;
  height: 7rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.color.black[30]};

  transition: background-color 0.3s ease-out;
`;

export const RoomCodeWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
`;

export const RoomCodeTitle = styled.span`
  height: 2rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.black[70]};
`;

export const RoomCode = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
`;
