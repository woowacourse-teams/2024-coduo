import styled, { css } from 'styled-components';

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

  padding: 1.2rem 3.2rem;
  border-radius: 5rem;

  transition: background-color 0.2s ease-in-out;

  cursor: pointer;

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
  border-radius: 0.5rem;

  color: ${({ theme }) => theme.color.primary[500]};
`;

export const ModalBodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  width: 100%;
  margin-top: 2.5rem;
`;

export const buttonStyles = css`
  width: 30rem;
  height: 6rem;

  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
