import type { Meta, StoryObj } from '@storybook/react';

import Label from './Label';

const meta = {
  title: 'component/common/Dropdown/Label',
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    message: '드롭다운 레이블 예시',
  },
};
