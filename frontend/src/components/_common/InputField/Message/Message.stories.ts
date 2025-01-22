import type { Meta, StoryObj } from '@storybook/react';

import { InputStatus } from '@/components/_common/InputField/InputField.type';
import Message from '@/components/_common/InputField/Message/Message';

const meta = {
  title: 'component/common/InputField/Message',
  component: Message,
  argTypes: {
    status: {
      control: 'select',
      options: ['DEFAULT', 'ERROR', 'SUCCESS'] as InputStatus[],
    },
  },
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    children: 'input 메세지',
    status: 'DEFAULT',
  },
};
