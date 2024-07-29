import { useParams } from 'react-router-dom';

import OnboardingModal from '@/components/PairRoom/OnboardingModal/OnboardingModal';

import useModal from '@/hooks/useModal';

const PairRoomOnboarding = () => {
  const { accessCode } = useParams();

  const { isModalOpen } = useModal(true);

  return <OnboardingModal accessCode={accessCode || ''} isOpen={isModalOpen} />;
};

export default PairRoomOnboarding;
