import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RepositoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 3rem;

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
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
`;

export const MissionBranch = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 4rem;
  padding: 0 1rem;
  border: 2px solid ${({ theme }) => theme.color.black[70]};
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[10]};
  color: ${({ theme }) => theme.color.black[70]};
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MissionBranchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.color.danger[500]};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
