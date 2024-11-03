import type { Meta, StoryObj } from '@storybook/react';

import Label from '@/components/_common/InputGroup/Label/Label';

const meta = {
  title: 'component/common/InputGroup/Label',
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'input 라벨',
  },
};
