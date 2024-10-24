import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  width: 100%;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({ theme }) => theme.color.black[20]};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 30%;
  min-width: 40rem;
  height: calc(100vh - 7rem);
  padding: 2rem;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 2rem;

  width: 70%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const PairInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.2rem 1.5rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[30]};
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const FirstPair = styled.span`
  color: ${({ theme }) => theme.color.primary[600]};
`;

export const SecondPair = styled.span`
  color: ${({ theme }) => theme.color.secondary[600]};
`;

export const RepositoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  width: fit-content;
  height: 4rem;
  padding: 1rem 2rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[80]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.base};

  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[90]};

    transform: scale(1.01);
  }
`;

export const GithubLogo = styled.img`
  width: 2rem;
  height: 2rem;
`;
