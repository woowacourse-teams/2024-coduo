import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';

const meta = {
  title: 'component/common/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

const EXAMPLE_OPTIONS = ['옵션1', '옵션2', '옵션3'];

export const Default: Story = {
  args: {
    placeholder: 'This is Dropdown',
    options: EXAMPLE_OPTIONS,
    onSelect: (option) => alert(`${option}를 선택했습니다.`),
  },
};
