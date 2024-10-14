import { useState, useRef } from 'react';

import * as S from '@/components/common/Dropdown/Dropdown/Dropdown.styles';
import HiddenDropdown from '@/components/common/Dropdown/HiddenDropdown/HiddenDropdown';

import useClickOutside from '@/hooks/common/useClickOutside';

import { theme } from '@/styles/theme';

export type Direction = 'lower' | 'upper';

export interface Option {
  id: string;
  value: string;
}
interface DropdownProps {
  placeholder: string;
  valueOptions?: Option[];
  options?: string[];
  selectedOption?: string;
  width?: string;
  height?: string;
  direction?: Direction;
  onSelect: (option: string) => void;
  children?: React.ReactNode;
}

const Dropdown = ({
  placeholder,
  options,
  selectedOption = '',
  width = '100%',
  height = '4.8rem',
  direction = 'lower',
  onSelect,
  children,
  valueOptions,
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
      <HiddenDropdown
        options={options}
        valueOptions={valueOptions}
        selectedOption={selectedOption}
        handleSelect={handleSelect}
      />
      <S.DropdownContainer $direction={direction}>
        {children && isOpen ? (
          children
        ) : (
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
        )}

        {options && !options.some((option) => option === '') && isOpen && (
          <S.ItemList $height={height} $direction={direction}>
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

        {valueOptions && !valueOptions.some((option) => option.value === '') && isOpen && (
          <S.ItemList $height={height} $direction={direction}>
            {valueOptions.map((option, index) => (
              <li key={`${option}_${index}`}>
                <S.Item
                  filled={false}
                  role="option"
                  aria-selected={selectedOption === option.value}
                  onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    event.stopPropagation();
                    handleSelect(option.id);
                  }}
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
