import styled from 'styled-components';

export const Layout = styled.a`
  cursor: pointer;

  display: flex;
  flex-direction: column;

  width: 20rem;
  height: 23rem;

  border: 1px solid ${({ theme }) => theme.color.black[30]};
  border-radius: 1.5rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 12.5rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const NoneImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 12.5rem;

  background-color: ${({ theme }) => theme.color.black[30]};
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const Box = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 10rem;
  padding: 2rem 1.6rem;
`;

export const Title = styled.p`
  overflow: hidden;

  font-size: ${({ theme }) => theme.fontSize.md};
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

export const Content = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  height: 4.2rem;

  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.black[60]};
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: normal;
`;
