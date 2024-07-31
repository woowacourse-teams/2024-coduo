import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  padding: 4rem 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.primary[100]};
  border-radius: 1rem;
`;

export const InformationTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const InformationDescription = styled.p`
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  line-height: 1.6;
`;

export const SettingsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
`;

export const DropdownLabel = styled.p`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;

export const TimeSelectButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.2rem;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const inputStyles = css`
  height: 4rem;
  border-radius: 1rem;
`;
