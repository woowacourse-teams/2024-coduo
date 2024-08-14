import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 20rem;
  height: 24rem;
  border: 1px solid ${({ theme }) => theme.color.black[30]};
  border-radius: 1.5rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 12rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const NoneImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 12rem;

  background-color: ${({ theme }) => theme.color.black[40]};
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.3;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;

  width: 100%;
  height: 12rem;
  max-height: 12rem;
  padding: 1.6rem;

  cursor: pointer;
`;

export const Title = styled.p`
  overflow: hidden;

  width: 100%;
  margin: 0.5rem 0;

  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export const Content = styled.p`
  display: -webkit-box;
  overflow: hidden;

  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const DeleteButton = styled(MdClose)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 3;

  width: 2rem;
  height: 2rem;
  padding: 0.3rem;
  border-radius: 100%;

  background-color: ${({ theme }) => theme.color.black[80]};
  opacity: 0.5;
  color: ${({ theme }) => theme.color.black[50]};

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
