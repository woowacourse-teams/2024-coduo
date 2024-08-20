import { useState } from 'react';

import { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerInput from '@/components/PairRoomOnboarding/TimerInput/TimerInput';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  // const [index, setIndex] = useState(0);

  const [firstPair, setFirstPair] = useState('');
  const [secondPair, setSecondPair] = useState('');

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const handleFirstPair = (firstPair: string) => setFirstPair(firstPair);
  const handleSecondPair = (secondPair: string) => setSecondPair(secondPair);

  // const handleSuccess = () => {
  //   navigate(`/room/${accessCode}`, { state: { driver, navigator } });
  // };

  // const { handleAddTimer, isPending } = useAddTimer(handleSuccess);

  const handleRole = (pairName: string, role: Role) => {
    const otherPair = firstPair === pairName ? secondPair : firstPair;
    switch (role) {
      case 'DRIVER':
        setDriver(pairName);
        setNavigator(otherPair);
        return;
      case 'NAVIGATOR':
        setDriver(otherPair);
        setNavigator(pairName);
        return;
    }
  };

  console.log(driver, navigator);

  // const handleRole = (driver: string, navigator: string) => {
  //   setDriver(driver);
  //   setNavigator(navigator);
  // };

  // const handleTimerSelection = (timer: string) => {
  //   handleAddTimer({ timer, accessCode: accessCode || '' });
  // };

  // if (isFetching || isPending) {
  //   return (
  //     <S.Layout>
  //       <Spinner />
  //     </S.Layout>
  //   );
  // }

  return (
    <S.Layout>
      <S.Container>
        <S.Title>그냥 시작하기</S.Title>
        {/* <ProgressBar step={step} /> */}
        {/* {step === 'MISSION' && <StartMission handleStartMission={handleStartMission} />} */}
        <PairNameInput onFirstPair={handleFirstPair} onSecondPair={handleSecondPair} />
        <PairRoleInput
          firstPair={firstPair}
          secondPair={secondPair}
          driver={driver}
          navigator={navigator}
          onRole={handleRole}
        />
        <TimerInput />
        <S.ButtonWrapper>
          <Button>{BUTTON_TEXT.COMPLETE}</Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;
