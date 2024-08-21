import { useState, useRef } from 'react';

import * as S from '@/components/common/Dropdown/Dropdown/Dropdown.styles';
import HiddenDropdown from '@/components/common/Dropdown/HiddenDropdown/HiddenDropdown';

import useClickOutside from '@/hooks/common/useClickOutside';

import { theme } from '@/styles/theme';

export type Direction = 'lower' | 'upper';

interface DropdownProps {
  placeholder: string;
  options: string[];
  selectedOption?: string;
  width?: string;
  height?: string;
  direction?: Direction;
  onSelect: (option: string) => void;
}

const Dropdown = ({
  placeholder,
  options,
  selectedOption = '',
  width = '100%',
  height = '4.8rem',
  direction = 'lower',
  onSelect,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Layout $width={width} ref={dropdownRef} $height={height}>
      <HiddenDropdown options={options} selectedOption={selectedOption} handleSelect={handleSelect} />
      <S.DropdownContainer $direction={direction}>
        <S.OpenButton
          role="listbox"
          filled={false}
          $isSelected={!!selectedOption}
          $isOpen={isOpen}
          onClick={toggleDropdown}
        >
          {selectedOption || placeholder}
          <S.Icon $isOpen={isOpen} size={theme.iconSize.md} $direction={direction} />
        </S.OpenButton>
        {!options.every((option) => option === '') && isOpen && (
          <S.ItemList $width={width} $height={height} $direction={direction}>
            {options.map((option, index) => (
              <li key={`${option}_${index}`}>
                <S.Item
                  filled={false}
                  role="option"
                  aria-selected={selectedOption === option}
                  onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    event.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  {option}
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
