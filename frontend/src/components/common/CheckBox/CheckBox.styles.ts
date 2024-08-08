import styled from 'styled-components';

export const Layout = styled.div`
  cursor: pointer;
  display: flex;
`;

export const Input = styled.input`
  display: none;
`;

export const CheckMark = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.color.secondary[500] : theme.color.secondary[200]};
  border: 1px solid ${({ theme }) => theme.color.secondary[500]};
  border-radius: 4px;

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme, $isChecked }) =>
      $isChecked ? theme.color.secondary[600] : theme.color.secondary[300]};
  }
`;
