import type { Meta, StoryObj } from '@storybook/react';

import Docs from '@/components/CoduoDocs/Docs/Docs';

const meta = {
  title: 'component/CoduoDocs/Docs',
  component: Docs,
} satisfies Meta<typeof Docs>;

export default meta;

type Story = StoryObj<typeof Docs>;

export const Default: Story = {};
