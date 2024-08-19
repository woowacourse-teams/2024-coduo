import { useState, useEffect, useRef } from 'react';

import * as S from '@/components/common/Dropdown/Dropdown/Dropdown.styles';
import HiddenDropdown from '@/components/common/Dropdown/HiddenDropdown/HiddenDropdown';

import useClickOutside from '@/hooks/common/useClickOutside';

import { theme } from '@/styles/theme';

export type Direction = 'lower' | 'upper';

interface DropdownProps {
  placeholder: string;
  options: string[];
  onSelect: (option: string) => void;
  defaultOption?: string;
  selected?: string;
  direction?: Direction;
  width?: string;
  height?: string;
}

const Dropdown = ({
  placeholder,
  options,
  onSelect,
  defaultOption,
  selected,
  direction = 'lower',
  height = '4.8rem',
  width = '100%',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected !== undefined) {
      setSelectedOption(selected);
    }
  }, [selected]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <S.Layout $width={width} ref={dropdownRef} $height={height}>
      <HiddenDropdown options={options} selectedOption={selectedOption} handleSelect={handleSelect} />
      <S.DropdownContainer $direction={direction}>
        <S.OpenButton
          filled={false}
          $isSelected={!!selectedOption}
          $isOpen={isOpen}
          role="listbox"
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {selectedOption || placeholder}
          <S.Icon $isOpen={isOpen} size={theme.iconSize.md} $direction={direction} />
        </S.OpenButton>
        {isOpen && (
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
