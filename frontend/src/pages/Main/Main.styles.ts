import styled, { css } from 'styled-components';

export const GithubLoginButton = css`
  justify-content: space-evenly;

  border: 1px solid ${({ theme }) => theme.color.black[80]};

  background-color: ${({ theme }) => theme.color.black[90]};
  color: ${({ theme }) => theme.color.black[10]};

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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  position: relative;

  min-height: calc(100vh - 7rem);
  padding: 8rem 10.8vw;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;
    gap: 8rem;

    min-height: 0;
    padding: 8rem 5.4vw;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    align-items: center;
    gap: 4rem;

    text-align: center;
  }
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 1.4;

  span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.h5};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[500]};
  font-size: 10rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  span {
    color: ${({ theme }) => theme.color.secondary[500]};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    font-size: 7rem;
  }
`;

export const Info = styled.p`
  opacity: 0.5;
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h6};
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export const buttonStyles = css`
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    min-width: 15rem;
    max-height: 5rem;
    padding: 2rem 4rem;

    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;
