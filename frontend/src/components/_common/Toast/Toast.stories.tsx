import type { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';

const meta = {
  title: 'component/common/Toast',
  component: Toast,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    status: {
      options: ['SUCCESS', 'INFO', 'WARNING', 'ERROR'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: '에러 메시지',
  },
};
