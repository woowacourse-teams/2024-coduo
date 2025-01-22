import type { Meta, StoryObj } from '@storybook/react';

import CompleteRoomButton from '@/components/PairRoom/PairListCard/CompleteRoomButton/CompleteRoomButton';

import useUserStore from '@/stores/userStore';

const USER_NAME = 'CODUO';

const meta = {
  title: 'component/PairRoom/PairListCard/CompleteRoomButton',
  component: CompleteRoomButton,
  decorators: [
    (Story) => {
      const { setUser } = useUserStore.getState();
      setUser(USER_NAME, 'SIGNED_IN');

      return <Story />;
    },
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CompleteRoomButton>;

export default meta;

type Story = StoryObj<typeof CompleteRoomButton>;

export const LoggedIn: Story = {
  args: {
    isOpen: true,
  },
};

export const ClosedLoggedIn: Story = {
  args: {
    isOpen: false,
  },
};

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      const { resetUser } = useUserStore.getState();
      resetUser();
      return <Story />;
    },
  ],
  args: {
    isOpen: true,
  },
};
