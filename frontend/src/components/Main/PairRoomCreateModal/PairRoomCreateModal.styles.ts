import styled from 'styled-components';

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Content = styled.div`
  cursor: pointer;

  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  padding: 1.2rem 3.2rem;

  border-radius: 5rem;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[30]};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.black[40]};
  }
`;
export const PairRoomCode = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const IconBox = styled.div`
  padding: 0.5rem;
  padding-bottom: 0;
  color: ${({ theme }) => theme.color.primary[500]};
  border-radius: 0.5rem;
`;

export const ModalBodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
