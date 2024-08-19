import styled from 'styled-components';

export const Categories = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  width: 100%;
`;

export const Category = styled.li<{ $isChecked: boolean }>`
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

export const CategoryInput = styled.input`
  width: 100%;
  border: 1px solid;
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 2.5rem;

  width: 100%;

  cursor: pointer;
`;

export const CategoryIconsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const IconsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border-radius: 0.3rem;

  color: ${({ theme }) => theme.color.primary[700]};

  transition: all 0.3s;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
    color: ${({ theme }) => theme.color.primary[800]};
  }
`;

export const EditFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;

export const CategoryItemContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 29rem;

  cursor: pointer;

  img {
    width: 2rem;
  }
`;

export const CategoryItemInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.7rem;
`;
