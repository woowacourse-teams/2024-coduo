import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  max-height: 40rem;
  padding: 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;

  background-color: #fdfdfd;
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;
  resize: vertical;

  word-wrap: break-word;
  overflow-wrap: break-word;

  &:focus {
    border: 1.5px solid ${({ theme }) => theme.color.primary[600]};

    background-color: ${({ theme }) => theme.color.primary[100]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.black[50]};
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const CharNumber = styled.p`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  padding: 0.5rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[10]};
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
