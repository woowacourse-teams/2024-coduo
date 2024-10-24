import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  max-height: 40rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.color.black[20]};
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;
  resize: vertical;

  word-wrap: break-word;
  overflow-wrap: break-word;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary[600]};

    background-color: ${({ theme }) => theme.color.black[10]};
    color: ${({ theme }) => theme.color.black[90]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.black[50]};
  }
`;

export const CharNumberText = styled.p`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  padding: 0.5rem 1rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[20]};
  color: ${({ theme }) => theme.color.primary[600]};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
