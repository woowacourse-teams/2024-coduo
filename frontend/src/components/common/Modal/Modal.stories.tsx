import type { Meta, StoryObj } from '@storybook/react';

import Body from '@/components/common/Modal/Body/Body';
import Footer from '@/components/common/Modal/Footer/Footer';
import Header from '@/components/common/Modal/Header/Header';

import Modal from './Modal';

const meta = {
  title: 'component/common/Modal',
  component: Modal,
  parameters: {
    controls: { exclude: ['close', 'children'] },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    position: {
      options: ['center', 'bottom'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    backdropType: {
      options: ['transparent', 'blur', 'opaque'],
      control: { type: 'radio' },
    },
    shadow: {
      control: { type: 'boolean' },
    },
    animation: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const CHILDREN_EXAMPLE = (
  <>
    <Header title="모달 제목" subTitle="모달 부제목" />
    <Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
      Pellentesque sit amet hendrerit risus, sed porttitor quam. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
      quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
      venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
      porttitor quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
      venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.Lorem ipsum dolor sit amet, consectetur
      adipiscing elit.
    </Body>
    <Footer onConfirm={() => {}} onCancel={() => {}} />
  </>
);

export const Center: Story = {
  args: {
    isOpen: true,
    children: CHILDREN_EXAMPLE,
  },
};

export const Bottom: Story = {
  args: {
    isOpen: true,
    children: CHILDREN_EXAMPLE,
    position: 'bottom',
  },
};
