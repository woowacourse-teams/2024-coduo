import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  overflow: hidden;

  height: calc(100vh - 7rem);
  padding: 10rem;

  background: linear-gradient(
    140deg,
    ${({ theme }) => theme.color.secondary[100]},
    ${({ theme }) => theme.color.primary[200]}
  );
  background-color: ${({ theme }) => theme.color.black[100]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 4rem;
  }
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.normal};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.h4};
  }
`;

export const Logo = styled.img`
  width: 50rem;
  filter: drop-shadow(0 0 2rem ${({ theme }) => theme.color.black[100]});

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 40rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;
    gap: 2rem;
  }
`;
