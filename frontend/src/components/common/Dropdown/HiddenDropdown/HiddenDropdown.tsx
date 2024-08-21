interface HiddenDropdownProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: string[];
  selectedOption?: string;
  handleSelect: (value: string) => void;
}

const HiddenDropdown = ({ options, selectedOption, handleSelect }: HiddenDropdownProps) => {
  return (
    <select
      style={{ display: 'none' }}
      value={selectedOption || ''}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleSelect(event.target.value)}
    >
      {!options.every((option) => option === '') &&
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

// 웹 접근성 향상을 위해 숨겨진 select 태그 구현

export default HiddenDropdown;
