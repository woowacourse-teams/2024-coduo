import styled, { css } from 'styled-components';

export const LayoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 100%;
`;

const positionFixed = css`
  position: fixed;
  bottom: 0;
  left: 50%;

  transform: translate(-50%);
`;

export const SubmitButton = css`
  ${positionFixed}
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60%;
  min-width: 76.8rem;
  height: 6rem;
  border-radius: 0;

  &:active {
    ${positionFixed}
  }

  &:hover {
    ${positionFixed}
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
  }
`;
