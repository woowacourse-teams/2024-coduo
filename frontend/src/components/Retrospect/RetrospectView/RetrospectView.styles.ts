import styled from 'styled-components';

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
