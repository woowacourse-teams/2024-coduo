import { useState, useRef } from 'react';

import * as S from '@/components/_common/Dropdown/Dropdown.styles';
// import HiddenDropdown from '@/components/_common/Dropdown/HiddenDropdown';

import useClickOutside from '@/hooks/_common/customEvent/useClickOutside';

import { theme } from '@/styles/theme';

export type Direction = 'lower' | 'upper';

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
  direction?: Direction;
  onSelect: (optionId: string) => void;
}

const Dropdown = ({
  options,
  selectedOption = '',
  placeholder = '',
  width = '100%',
  height = '4.8rem',
  direction = 'lower',
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
    <S.Layout $width={width} ref={dropdownRef} $height={height}>
      {/* <HiddenDropdown valueOptions={valueOptions} selectedOption={selectedOption} handleSelect={handleOptionSelect} /> */}
      <S.DropdownContainer $direction={direction}>
        <S.OpenButton
          role="listbox"
          filled={false}
          $isSelected={!!selectedOption}
          $isOpen={isOpen}
          onClick={toggleDropdown}
          aria-label={isOpen ? '드롭다운을 닫습니다' : '드롭다운을 엽니다'}
        >
          {selectedOption || placeholder}
          <S.Icon $isOpen={isOpen} size={theme.iconSize.md} $direction={direction} />
        </S.OpenButton>
        {isOpen && (
          <S.ItemList $height={height} $direction={direction}>
            {options.map((option, index) => (
              <li key={`${option}_${index}`}>
                <S.Item
                  filled={false}
                  role="option"
                  aria-selected={selectedOption === option.value}
                  onClick={(event) => handleOptionClick(event, option.id)}
                >
                  {option.value}
                </S.Item>
              </li>
            ))}
          </S.ItemList>
        )}
      </S.DropdownContainer>
    </S.Layout>
  );
};

export default Dropdown;
