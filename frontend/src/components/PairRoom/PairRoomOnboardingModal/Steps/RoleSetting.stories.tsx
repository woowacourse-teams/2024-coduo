import type { Meta, StoryObj } from '@storybook/react';

import { Role } from '@/components/PairRoom/PairRoomOnboardingModal/PairRoomOnboardingModal.type';

import RoleSetting from './RoleSetting';

const meta = {
  title: 'component/PairRoom/PairRoomOnboardingModal/Steps/RoleSetting',
  component: RoleSetting,
} satisfies Meta<typeof RoleSetting>;

export default meta;

type Story = StoryObj<typeof RoleSetting>;

export const Default: Story = {
  args: {
    driver: 'user1',
    navigator: 'user2',
    handleSelect: (role: Role, option: string) => {
      alert(`${option} : ${role}`);
    },
  },
};
