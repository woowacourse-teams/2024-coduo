import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from './CloseButton';

const meta = {
  title: 'component/common/modal/CloseButton',
  component: CloseButton,
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {};
