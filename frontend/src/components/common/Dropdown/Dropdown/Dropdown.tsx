import { useState } from 'react';

import * as S from '@/components/common/Dropdown/Dropdown/Dropdown.styles';
import HiddenDropdown from '@/components/common/Dropdown/HiddenDropdown/HiddenDropdown';

import { theme } from '@/styles/theme';

interface DropdownProps {
  placeholder: string;
  options: string[];
  onSelect: (option: string) => void;
  defaultOption?: string;
  width?: string;
}

const Dropdown = ({ placeholder, options, onSelect, defaultOption, width = '100%' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(defaultOption);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <S.Layout style={{ width: width }}>
      <HiddenDropdown options={options} selectedOption={selectedOption} handleSelect={handleSelect} />
      <S.DropdownButton
        filled={false}
        $isSelected={!!selectedOption}
        $isOpen={isOpen}
        role="listbox"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
        <S.DropdownIcon $isOpen={isOpen} size={theme.iconSize.md} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownMenu>
          {options.map((option) => (
            <li key={option}>
              <S.DropdownMenuItem
                filled={false}
                role="option"
                aria-selected={selectedOption === option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </S.DropdownMenuItem>
            </li>
          ))}
        </S.DropdownMenu>
      )}
    </S.Layout>
  );
};

export default Dropdown;
