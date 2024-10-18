import styled from 'styled-components';

export const TextArea = styled.textarea`
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

export const Text = styled.pre`
  overflow-y: auto;

  width: 100%;
  min-height: 10rem;
  max-height: 35rem;
  margin: 0;

  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 300;
  white-space: pre-wrap;
  font-family: 'Pretendard Variable', sans-serif !important;
  word-wrap: break-word;
`;
