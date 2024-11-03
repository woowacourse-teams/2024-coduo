import type { Meta, StoryObj } from '@storybook/react';

import Content from '@/components/_common/InputGroup/Content/Content';

const meta = {
  title: 'component/common/InputGroup/Content',
  component: Content,
} satisfies Meta<typeof Content>;

export default meta;

type Story = StoryObj<typeof Content>;

export const Default: Story = {
  args: {
    children: '본문 표시',
  },
};
