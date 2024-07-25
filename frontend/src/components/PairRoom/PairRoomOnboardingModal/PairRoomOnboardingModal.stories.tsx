import type { Meta, StoryObj } from '@storybook/react';

import PairRoomOnboardingModal from './PairRoomOnboardingModal';

const meta = {
  title: 'component/PairRoom/PairRoomOnboardingModal',
  component: PairRoomOnboardingModal,
} satisfies Meta<typeof PairRoomOnboardingModal>;

export default meta;

type Story = StoryObj<typeof PairRoomOnboardingModal>;

export const Default: Story = {};
