import { useState, useEffect, useRef } from 'react';

import * as S from '@/components/common/Dropdown/Dropdown/Dropdown.styles';
import HiddenDropdown from '@/components/common/Dropdown/HiddenDropdown/HiddenDropdown';

import useClickOutside from '@/hooks/useClickOutside';

import { theme } from '@/styles/theme';

interface DropdownProps {
  placeholder: string;
  options: string[];
  onSelect: (option: string) => void;
  defaultOption?: string;
  selected?: string;
  width?: string;
}

const Dropdown = ({ placeholder, options, onSelect, defaultOption, selected, width = '100%' }: DropdownProps) => {
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
    <S.Layout $width={width} ref={dropdownRef}>
      <HiddenDropdown options={options} selectedOption={selectedOption} handleSelect={handleSelect} />
      <S.OpenButton
        filled={false}
        $isSelected={!!selectedOption}
        $isOpen={isOpen}
        role="listbox"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
        <S.Icon $isOpen={isOpen} size={theme.iconSize.md} />
      </S.OpenButton>
      {isOpen && (
        <S.ItemList>
          {options.map((option, index) => (
            <li key={`${option}_${index}`}>
              <S.Item
                filled={false}
                role="option"
                aria-selected={selectedOption === option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </S.Item>
            </li>
          ))}
        </S.ItemList>
      )}
    </S.Layout>
  );
};

export default Dropdown;
