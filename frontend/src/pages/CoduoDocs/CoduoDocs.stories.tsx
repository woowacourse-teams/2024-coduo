import type { Meta, StoryObj } from '@storybook/react';

import CoduoDocs from '@/pages/CoduoDocs/CoduoDocs';

const meta = {
  title: 'component/CoduoDocs/CoduoDocs',
  component: CoduoDocs,
} satisfies Meta<typeof CoduoDocs>;

export default meta;

type Story = StoryObj<typeof CoduoDocs>;

export const Default: Story = {};
