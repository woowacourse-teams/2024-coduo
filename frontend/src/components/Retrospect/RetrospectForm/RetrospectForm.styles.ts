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

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  max-height: 35rem;
  padding: 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;

  background-color: #fdfdfd;
  font-size: ${({ theme }) => theme.fontSize.md};
  resize: vertical;

  &:focus {
    border: 1.5px solid ${({ theme }) => theme.color.primary[600]};

    background-color: ${({ theme }) => theme.color.primary[100]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.black[50]};
  }
`;
