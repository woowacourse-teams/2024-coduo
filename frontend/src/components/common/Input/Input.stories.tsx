import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/common/Input/Input';

const meta = {
  title: 'component/common/TitleContainer',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'default',
    placeholder: '입력해주세요',
    message: '메세지입니다',
    label: '라벨',
    disabled: false,
  },
};
