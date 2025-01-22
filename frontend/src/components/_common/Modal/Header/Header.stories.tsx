import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'component/common/modal/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: '제목 표시',
    subTitle: '부제목 표시',
  },
};
