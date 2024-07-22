import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';

const meta = {
  title: 'component/common/modal/Footer',
  component: Footer,
  parameters: {
    controls: { exclude: ['onConfirm', 'onCancel'] },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Left: Story = {
  args: {
    direction: 'left',
  },
};

export const Center: Story = {
  args: {
    direction: 'center',
  },
};

export const Right: Story = {
  args: {
    direction: 'right',
  },
};
