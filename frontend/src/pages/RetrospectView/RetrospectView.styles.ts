import styled from 'styled-components';

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
