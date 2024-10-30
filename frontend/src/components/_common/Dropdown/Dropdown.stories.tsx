import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@/components/_common/Dropdown/Dropdown';

import { findValueById } from '@/utils/findOption';

const meta = {
  title: 'component/common/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { exclude: ['options', 'selectedOption', 'onSelect'] },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

const EXAMPLE_OPTIONS = [
  {
    id: '1',
    value: '옵션 1',
  },
  {
    id: '2',
    value: '옵션 2',
  },
  {
    id: '3',
    value: '옵션 3',
  },
];

export const Default: Story = {
  args: {
    placeholder: '드롭다운 예시',
    options: EXAMPLE_OPTIONS,
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (optionId: string) => {
      const value = findValueById(EXAMPLE_OPTIONS, optionId);
      setSelectedOption(value || '');
    };

    return <Dropdown {...args} selectedOption={selectedOption} onSelect={handleSelect} />;
  },
};
