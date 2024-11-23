import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const Item = styled.li<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  padding: 0 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.black[300]};
  border-radius: 0.5rem;

  background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.primary[800] : theme.color.black[0])};
  color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.black[0] : theme.color.black[700])};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary[800]};
    color: ${({ theme }) => theme.color.black[0]};
  }
`;
