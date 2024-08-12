import type { Meta, StoryObj } from '@storybook/react';

import Spinner from './Spinner';

const meta = {
  title: 'component/common/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
