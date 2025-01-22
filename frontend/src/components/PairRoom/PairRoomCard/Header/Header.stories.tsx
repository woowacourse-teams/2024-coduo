import type { Meta, StoryObj } from '@storybook/react';
import { IoPeople } from 'react-icons/io5';

import { theme } from '@/styles/theme';

import Header from './Header';

const meta = {
  title: 'component/PairRoom/PairRoomCard/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    icon: <IoPeople color={theme.color.primary[500]} />,
    title: '제목',
    children: <div>추가 컨텐츠</div>,
  },
};
