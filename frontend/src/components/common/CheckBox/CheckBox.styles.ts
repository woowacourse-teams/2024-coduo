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
  border: 1px solid ${({ theme }) => theme.color.secondary[500]};
  border-radius: 4px;

  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.color.secondary[500] : theme.color.secondary[200]};

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme, $isChecked }) =>
      $isChecked ? theme.color.secondary[600] : theme.color.secondary[300]};
  }
`;
