import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: 26rem;
  height: 6rem;

  font-size: ${({ theme }) => theme.fontSize.h6};
`;

export const githubButtonStyles = css`
  justify-content: space-evenly;

  width: 26rem;
  height: 6rem;
  border: 1px solid ${({ theme }) => theme.color.black[80]};

  background-color: ${({ theme }) => theme.color.black[90]};
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.h6};

  img {
    width: 3rem;
    height: 3rem;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.black[70]};

    background-color: ${({ theme }) => theme.color.black[80]};
    color: ${({ theme }) => theme.color.black[10]};
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.color.black[60]};

    background-color: ${({ theme }) => theme.color.black[70]};
    color: ${({ theme }) => theme.color.black[10]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  overflow: hidden;

  height: calc(100vh - 7rem);
  padding: 10rem;

  background-color: ${({ theme }) => theme.color.primary[100]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 4rem;
  }
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.normal};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.h4};
  }
`;

export const Logo = styled.img`
  width: 50rem;
  filter: drop-shadow(0 0 2rem ${({ theme }) => theme.color.black[10]});

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
