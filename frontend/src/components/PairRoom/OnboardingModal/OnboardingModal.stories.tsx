import type { Meta, StoryObj } from '@storybook/react';

import OnboardingModal from './OnboardingModal';

const meta = {
  title: 'component/PairRoom/OnboardingModal',
  component: OnboardingModal,
} satisfies Meta<typeof OnboardingModal>;

export default meta;

type Story = StoryObj<typeof OnboardingModal>;

export const Default: Story = {};
