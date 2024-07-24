import type { Meta, StoryObj } from '@storybook/react';

import TimerSetting from './TimerSetting';

const meta = {
  title: 'component/PairRoom/PairRoomOnboardingModal/Steps/TimerSetting',
  component: TimerSetting,
} satisfies Meta<typeof TimerSetting>;

export default meta;

type Story = StoryObj<typeof TimerSetting>;

export const Default: Story = {
  args: {
    timer: '25',
    setTimer: (value: string) => {
      alert(`${value}분`);
    },
  },
};
