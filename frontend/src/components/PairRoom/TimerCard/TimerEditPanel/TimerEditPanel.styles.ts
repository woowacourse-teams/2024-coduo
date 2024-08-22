import { IoSettingsOutline } from 'react-icons/io5';
import styled, { keyframes } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

export const Icon = styled(IoSettingsOutline)`
  width: 2rem;
  height: 2rem;

  color: ${({ theme }) => theme.color.black[70]};

  transition: color 0.2s ease;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.secondary[600]};
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Panel = styled.div`
  padding: 1.5rem 2rem;
  border: 1px solid ${({ theme }) => theme.color.black[30]};
  border-radius: 1rem;

  background: ${({ theme }) => theme.color.black[10]};

  animation: ${slideDown} 0.3s ease-out;
`;

export const Title = styled.p`
  margin-bottom: 0.5rem;

  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
