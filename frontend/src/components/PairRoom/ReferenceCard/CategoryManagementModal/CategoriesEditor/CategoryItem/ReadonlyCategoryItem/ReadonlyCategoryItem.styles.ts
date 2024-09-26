import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 25rem;
`;

export const ReadonlyCategoryItem = styled.li<{ $isChecked: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  border-radius: 0.5rem;

  background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.primary[700] : theme.color.black[10])};
  color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.black[10] : theme.color.black[70])};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary[700]};
    color: ${({ theme }) => theme.color.black[10]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.primary[800]};
    color: ${({ theme }) => theme.color.black[10]};
  }
`;
