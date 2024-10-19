import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({ theme }) => theme.color.black[20]};
`;

export const CompletedPairRoomInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: calc(100vh - 14rem);
  padding: 2rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const RoomCode = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const PairInfo = styled.p`
  display: flex;
  align-items: center;

  padding: 1rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[30]};
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const FirstPair = styled.p`
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const SecondPair = styled.p`
  color: ${({ theme }) => theme.color.secondary[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const RepositoryLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const GithubLogo = styled.img`
  width: 2rem;
  height: 2rem;
`;
