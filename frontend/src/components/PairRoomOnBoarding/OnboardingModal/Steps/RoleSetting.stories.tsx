import type { Meta, StoryObj } from '@storybook/react';

import RoleSetting from './RoleSetting';

const meta = {
  title: 'component/PairRoom/OnboardingModal/Steps/RoleSetting',
  component: RoleSetting,
} satisfies Meta<typeof RoleSetting>;

export default meta;

type Story = StoryObj<typeof RoleSetting>;

export const Default: Story = {
  args: {
    driver: 'user1',
    navigator: 'user2',
  },
};
