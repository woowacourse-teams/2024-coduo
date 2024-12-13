import type { Meta, StoryObj } from '@storybook/react';

import Textarea from '@/components/Retrospect/Textarea/Textarea';

const meta = {
  title: 'component/Retrospect/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
