import type { Meta, StoryObj } from '@storybook/react';

import ReferenceCard from './ReferenceCard';

const meta = {
  title: 'component/PairRoom/ReferenceCard',
  component: ReferenceCard,
} satisfies Meta<typeof ReferenceCard>;

export default meta;

type Story = StoryObj<typeof ReferenceCard>;

export const Default: Story = {
  render: () => <ReferenceCard accessCode="1234" isOpen={true} toggleIsOpen={() => {}} />,
};
