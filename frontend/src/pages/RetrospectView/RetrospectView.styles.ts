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

export const TextWrapper = styled.pre`
  overflow-y: auto;

  width: 100%;
  margin: 0;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.color.black[20]};
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Pretendard Variable', sans-serif !important;
`;
