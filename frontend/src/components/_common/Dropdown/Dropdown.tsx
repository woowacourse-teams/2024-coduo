import { useState, useRef } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useClickOutside from '@/hooks/_common/customEvent/useClickOutside';

import { theme } from '@/styles/theme';

import * as S from './Dropdown.styles';

export type Direction = 'LOWER' | 'UPPER';

export interface Option {
  id: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  direction?: Direction;
  onSelect: (optionId: string) => void;
}

const DIRECTION_ICONS = {
  LOWER: <IoIosArrowDown size={theme.fontSize.lg} />,
  UPPER: <IoIosArrowUp size={theme.fontSize.lg} />,
};

const Dropdown = ({
  options,
  selectedOption = '',
  placeholder = '',
  width = '100%',
  height = '4.8rem',
  color = theme.color.primary[800],
  fontSize = theme.fontSize.md,
  direction = 'LOWER',
  onSelect,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleOptionSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>, optionId: string) => {
    event.stopPropagation();
    handleOptionSelect(optionId);
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Layout ref={dropdownRef} $width={width}>
      <S.Container $direction={direction} $height={height} $color={color} $fontSize={fontSize}>
        <S.OpenButton
          role="listbox"
          aria-label={isOpen ? '드롭다운을 닫습니다' : '드롭다운을 엽니다'}
          $isOpen={isOpen}
          $isSelected={!!selectedOption}
          $color={color}
          onClick={toggleDropdown}
        >
          {selectedOption || placeholder}
          {DIRECTION_ICONS[direction]}
        </S.OpenButton>
        {isOpen && (
          <S.ItemList $direction={direction}>
            {options.map((option, index) => (
              <li key={`${option}_${index}`} role="option" aria-selected={selectedOption === option.value}>
                <button onClick={(event) => handleOptionClick(event, option.id)}>{option.value}</button>
              </li>
            ))}
          </S.ItemList>
        )}
      </S.Container>
    </S.Layout>
  );
};

export default Dropdown;
