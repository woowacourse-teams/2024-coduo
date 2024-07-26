import { useState } from 'react';

const useInput = <T extends object>(initialValue: T) => {
  const [inputValue, setInputValue] = useState<T>(initialValue);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    validateValue?: (value: string) => { status: string; message: string },
  ) => {
    const { value } = event.target;

    if (validateValue) {
      const { status, message } = validateValue(value);
      setInputValue({ ...inputValue, value, status, message });
    } else {
      setInputValue({ ...inputValue, value });
    }
  };

  const resetInputValue = () => setInputValue({ ...initialValue });

  return { inputValue, handleOnChange, resetInputValue } as const;
};

export default useInput;
