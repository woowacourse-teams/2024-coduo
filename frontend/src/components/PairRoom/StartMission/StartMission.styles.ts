import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 100%;
  padding: 4rem 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Repositories = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

export const MissionButton = css`
  border-width: 2px;

  &:hover {
    border-width: 2px;
  }

  &:active {
    border-width: 2px;
  }

  &:disabled {
    border-width: 2px;
  }
`;

export const MissionRepository = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 5rem;

  color: ${({ theme }) => theme.color.black[70]};

  background-color: ${({ theme }) => theme.color.black[10]};
  border: 2px solid ${({ theme }) => theme.color.black[70]};
  border-radius: 1rem;
`;

export const MissionBranch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  height: 4rem;

  color: ${({ theme }) => theme.color.black[10]};

  background-color: ${({ theme }) => theme.color.black[80]};
  border-radius: 1rem;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MissionBranchBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
`;
