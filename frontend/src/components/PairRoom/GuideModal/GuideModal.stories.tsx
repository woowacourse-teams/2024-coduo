import type { Meta, StoryObj } from '@storybook/react';

import GuideModal from '@/components/PairRoom/GuideModal/GuideModal';

const ACCESS_CODE = 'CODUO';

const meta = {
  title: 'component/PairRoom/GuideModal',
  component: GuideModal,

  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof GuideModal>;

export default meta;

type Story = StoryObj<typeof GuideModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    accessCode: ACCESS_CODE,
  },
};
