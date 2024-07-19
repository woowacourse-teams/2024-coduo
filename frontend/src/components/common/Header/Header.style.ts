import styled from 'styled-components';

const ButtonInteraction = styled.button`
  transition:
    transform 0.2s,
    opacity 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.85);
    opacity: 0.7;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  padding: 0 5rem;

  border-bottom: 0.3rem solid ${({ theme }) => theme.color.black[30]};
`;

export const LogoWrapper = styled(ButtonInteraction)``;

export const Logo = styled.img`
  height: 3.5rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
    transform: scale(0.95);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
`;

export const HomeButton = styled(ButtonInteraction)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
`;

export const HowToPairButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    font-size: 0;
  }
`;

export const HowToPairTextButton = styled(ButtonInteraction)`
  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.base};
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HowToPairIconButton = styled(ButtonInteraction)`
  color: ${({ theme }) => theme.color.black[80]};
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
