import styled from 'styled-components';

export const Layout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.color.black[80]};

  transition: background-color 0.3s ease-out;

  cursor: pointer;
`;

export const RepositoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`;

export const RepositoryText = styled.span`
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
