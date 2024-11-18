import { css } from 'styled-components';

export const buttonStyles = css`
  position: absolute;
  top: 3.5rem;
  right: 3.5rem;

  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.color.black[300]};

    transition: 0.2s all ease;

    &:hover {
      color: ${({ theme }) => theme.color.black[400]};
    }
  }
`;
