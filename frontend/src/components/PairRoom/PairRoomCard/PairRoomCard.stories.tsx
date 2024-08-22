import type { Meta, StoryObj } from '@storybook/react';
import { IoPeople } from 'react-icons/io5';

import { theme } from '@/styles/theme';

import Header from './Header/Header';
import PairRoomCard from './PairRoomCard';

const meta = {
  title: 'component/PairRoom/PairRoomCard',
  component: PairRoomCard,
} satisfies Meta<typeof PairRoomCard>;

export default meta;

type Story = StoryObj<typeof PairRoomCard>;

const CHILDREN_EXAMPLE = (
  <>
    <Header icon={<IoPeople color={theme.color.primary[500]} />} title="제목" />
    <div style={{ padding: '4rem', fontSize: theme.fontSize.base }}>본문</div>
  </>
);

export const Default: Story = {
  args: {
    children: CHILDREN_EXAMPLE,
  },
};
