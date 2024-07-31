import { useParams } from 'react-router-dom';

import OnboardingModal from '@/components/PairRoomOnBoarding/OnboardingModal/OnboardingModal';

import useModal from '@/hooks/common/useModal';

const PairRoomOnboarding = () => {
  const { accessCode } = useParams();

  const { isModalOpen } = useModal(true);

  return <OnboardingModal accessCode={accessCode || ''} isOpen={isModalOpen} />;
};

export default PairRoomOnboarding;
