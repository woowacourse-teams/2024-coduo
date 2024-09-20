import { Option } from '@/components/common/Dropdown/Dropdown/Dropdown';

interface HiddenDropdownProps extends React.HTMLAttributes<HTMLSelectElement> {
  options?: string[];
  selectedOption?: string;
  valueOptions?: Option[];

  handleSelect: (value: string) => void;
}

const HiddenDropdown = ({ options, selectedOption, handleSelect, valueOptions }: HiddenDropdownProps) => {
  return (
    <select
      style={{ display: 'none' }}
      value={selectedOption || ''}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleSelect(event.target.value)}
    >
      {options &&
        !options.every((option) => option === '') &&
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

      {valueOptions &&
        !valueOptions.every((option) => option.value === '') &&
        valueOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
    </select>
  );
};

// 웹 접근성 향상을 위해 숨겨진 select 태그 구현

export default HiddenDropdown;
