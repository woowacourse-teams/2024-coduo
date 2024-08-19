import styled from 'styled-components';

export const Categories = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  gap: 1rem;
`;

export const Category = styled.li<{ $isChecked: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.md};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  border-radius: 0.5rem;

  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.black[10] : theme.color.black[70])};
  background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.primary[700] : theme.color.black[10])};

  padding: 0 1rem;

  transition: all 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.color.black[10]};
    background-color: ${({ theme }) => theme.color.primary[700]};
  }
  &:active {
    color: ${({ theme }) => theme.color.black[10]};
    background-color: ${({ theme }) => theme.color.primary[800]};
  }
`;

export const CategoryInput = styled.input`
  width: 100%;
  border: 1px solid;
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 2.5rem;
  cursor: pointer;
  width: 100%;
`;

export const CategoryIconsBox = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

export const IconsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary[700]};
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 0.3rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
    color: ${({ theme }) => theme.color.primary[800]};
  }
`;

export const EditFrom = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const CategoryItemContainer = styled.button`
  display: flex;
  width: 29rem;

  align-items: center;
  gap: 1rem;
  cursor: pointer;
  img {
    width: 2rem;
  }
`;

export const CategoryItemInputBox = styled.div`
  display: flex;
  gap: 2.7rem;
  align-items: center;
`;
