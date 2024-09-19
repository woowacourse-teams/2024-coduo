import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;

  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`;

export const CheckMark = styled.div<{ $isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[60] : theme.color.secondary[500])};
  border-radius: 4px;

  background-color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[50] : theme.color.secondary[200])};

  transition: all 0.1s ease 0s;

  &:hover {
    background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.black[60] : theme.color.secondary[300])};
  }
`;
