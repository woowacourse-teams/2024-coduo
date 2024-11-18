import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/_common/InputField/Input/Input';
import { InputStatus } from '@/components/_common/InputField/Input.type';

import useInput from '@/hooks/_common/useInput';

const meta = {
  title: 'component/common/InputField/Input',
  component: Input,
  argTypes: {
    status: {
      control: 'select',
      options: ['DEFAULT', 'ERROR', 'SUCCESS'] as InputStatus[],
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputWithHook = () => {
  const { value, status, handleChange, resetValue } = useInput();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateValue =
      event.target.value.length > 5
        ? { status: 'ERROR' as const, message: '5글자를 넘을 수 없습니다' }
        : { status: 'DEFAULT' as const, message: '' };

    handleChange(event, validateValue);
  };
  return (
    <Input
      width="25rem"
      value={value}
      status={status}
      onChange={handleInputChange}
      onReset={resetValue}
      color="PRIMARY"
      placeholder="입력해주세요"
    />
  );
};

export const WithHook: Story = {
  render: () => <InputWithHook />,
};
