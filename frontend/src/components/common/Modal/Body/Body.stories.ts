import type { Meta, StoryObj } from '@storybook/react';

import Body from './Body';

const meta = {
  title: 'component/common/modal/Body',
  component: Body,
} satisfies Meta<typeof Body>;

export default meta;

type Story = StoryObj<typeof Body>;

export const Default: Story = {
  args: {
    children: '본문 표시',
  },
};
