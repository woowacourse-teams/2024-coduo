import type { Meta, StoryObj } from '@storybook/react';

import ContentBox from '@/components/CoduoDocs/FloatingSidebar/ContentBox';
import FloatingSidebar from '@/components/CoduoDocs/FloatingSidebar/FloatingSIdebar';

import { START_CONTENT } from '@/constants/coduoDocs';

const meta = {
  title: 'component/CoduoDocs/FloatingSidebar',
  component: FloatingSidebar,
} satisfies Meta<typeof FloatingSidebar>;

export default meta;

type Story = StoryObj<typeof FloatingSidebar>;

export const Default: Story = {
  render: () => (
    <FloatingSidebar>
      <ContentBox title="시작하기" contents={START_CONTENT} />
    </FloatingSidebar>
  ),
};
