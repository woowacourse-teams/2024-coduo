import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useToastStore from '@/stores/toastStore';

import { getPairRoomExists } from '@/apis/pairRoom';

const usePairRoomValid = (accessCode: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToast } = useToastStore();

  useEffect(() => {
    const checkAccessValid = async () => {
      if (!location.state?.valid) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요.' });
        return;
      }

      if (!accessCode) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '존재하지 않는 페어룸 코드입니다. 다시 확인해 주세요.' });
        return;
      }

      const { exists } = await getPairRoomExists(accessCode);

      if (!exists) {
        navigate('/main');
        addToast({ status: 'ERROR', message: '존재하지 않는 페어룸 코드입니다. 다시 확인해 주세요.' });
        return;
      }
    };

    checkAccessValid();
  }, [accessCode]);
};

export default usePairRoomValid;
