import styled from 'styled-components';

export const Layout = styled.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 25rem)' : '0')};

  transition: all 0.3s;

  /* min-height: 42rem; */
  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;

  /* height: 12rem; */
  min-height: 6rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CategoryModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const AddNewCategoryBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  height: 7rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.black[40]};
`;

export const AddNewCategoryInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
