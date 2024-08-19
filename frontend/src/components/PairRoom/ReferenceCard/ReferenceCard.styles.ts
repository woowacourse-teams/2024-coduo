import styled from 'styled-components';

export const Layout = styled.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: flex;
  overflow: hidden;

  flex-direction: column;
  transition: all 0.3s;

  height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 25rem)' : '0')};
  /* min-height: 42rem; */
  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  /* height: 12rem; */
  min-height: 6rem;
  gap: 1rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CategoryModalHeader = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.color.black[80]};
  gap: 1rem;
  align-items: center;
`;

export const AddNewCategoryBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.color.black[40]};
  padding-top: 2rem;
  justify-content: space-between;
  height: 7rem;
`;

export const AddNewCategoryInputBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
