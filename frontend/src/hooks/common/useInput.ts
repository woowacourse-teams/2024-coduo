import { useState } from 'react';

import type { InputStatus } from '@/components/common/Input/Input.type';

const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<InputStatus>('DEFAULT');
  const [message, setMessage] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    validateValue?: (value: string) => { status: InputStatus; message: string },
  ) => {
    if (validateValue) {
      const { status, message } = validateValue(event.target.value);

      setStatus(status);
      setMessage(message);
    }

    setValue(event.target.value);
  };

  const resetValue = () => setValue(initialValue);

  return { value, status, message, handleChange, resetValue } as const;
};

export default useInput;
