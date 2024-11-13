import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 20rem;
  min-height: 20rem;
  max-height: 40rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.black[300]};
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.color.black[50]};
  color: ${({ theme }) => theme.color.black[800]};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.6;
  resize: vertical;

  word-wrap: break-word;
  overflow-wrap: break-word;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary[700]};

    background-color: ${({ theme }) => theme.color.black[0]};
    color: ${({ theme }) => theme.color.black[900]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.black[300]};
  }
`;

export const CharNumberText = styled.p`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  padding: 0.5rem 1rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.black[50]};
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
