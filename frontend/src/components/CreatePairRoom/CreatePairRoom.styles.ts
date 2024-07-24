import styled from 'styled-components';

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1.2rem;
`;
export const PairRoomCode = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const IconBox = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary[500]};

  padding: 0.5rem;
  padding-bottom: 0;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.black[40]};
  }
`;

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
