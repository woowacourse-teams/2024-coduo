import styled, { css, keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
`;

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  overflow: hidden;

  height: calc(100vh - 7rem);
  padding: 10rem;
  padding: 0 10.8vw;

  background: linear-gradient(
    45deg,
    rgb(152 251 152 / 50%),
    rgb(0 224 200 / 50%),
    rgb(152 251 152 / 50%),
    rgb(0 224 200 / 50%)
  );

  animation: ${gradientAnimation} 10s linear infinite;
  background-size: 200% 200%;

  @media (width <= 768px) {
    padding: 1rem;
  }
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 1.3;

  span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[500]};
  font-size: 10rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  span {
    color: ${({ theme }) => theme.color.secondary[500]};
  }
`;

export const Logo = styled.img`
  width: 50rem;
  filter: drop-shadow(0 0 2rem ${({ theme }) => theme.color.black[10]});
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4rem;
`;
