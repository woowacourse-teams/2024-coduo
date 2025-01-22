import type { Meta, StoryObj } from '@storybook/react';

import AccessCodeSection from './AccessCodeSection';

const meta = {
  title: 'component/PairRoom/PairListCard/AccessCodeSection',
  component: AccessCodeSection,
} satisfies Meta<typeof AccessCodeSection>;

export default meta;

type Story = StoryObj<typeof AccessCodeSection>;

export const Default: Story = {
  args: {
    isOpen: true,
    accessCode: 'IUUIASDFJK',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    accessCode: 'IUUIASDFJK',
  },
};
