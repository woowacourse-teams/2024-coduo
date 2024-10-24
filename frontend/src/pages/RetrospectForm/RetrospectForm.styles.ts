import styled, { css } from 'styled-components';

const positionFixed = css`
  position: fixed;
  bottom: 0;
  left: 50%;

  transform: translate(-50%);
`;

export const buttonStyles = css`
  ${positionFixed}
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60%;
  min-width: 76.8rem;
  height: 6rem;
  border-radius: 0;

  &:hover {
    ${positionFixed}
  }

  &:active {
    ${positionFixed}
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
  }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 7rem);

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  position: relative;

  width: 60%;
  min-width: 76.8rem;
  padding: 4rem 4rem 12rem;

  background-color: ${({ theme }) => theme.color.black[10]};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    min-width: 0;
    padding: 4rem 4rem 12rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 100%;
`;
