import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button/Button';

const meta = {
  title: 'component/common/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    click: () => console.log(),
    children: '확인',
  },
};
