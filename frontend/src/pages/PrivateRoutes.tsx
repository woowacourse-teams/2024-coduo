import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

import Loading from '@/pages/Loading/Loading';

import useToastStore from '@/stores/toastStore';

import { getPairRoomExists } from '@/apis/pairRoom';

const PrivateRoutes = () => {
  const location = useLocation();
  const { accessCode } = useParams();

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const { addToast } = useToastStore();

  const validateAccess = async () => {
    if (!accessCode || !location.state?.valid) {
      setIsValid(false);
      addToast({ status: 'ERROR', message: '유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요.' });
      return;
    }

    const { exists } = await getPairRoomExists(accessCode);

    if (!exists) {
      setIsValid(false);
      addToast({ status: 'ERROR', message: '유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요.' });
      return;
    }

    setIsValid(true);
  };

  useEffect(() => {
    validateAccess();
  }, []);

  if (isValid === null) return <Loading />;

  if (!isValid) return <Navigate to="/main" replace />;

  return <Outlet />;
};

export default PrivateRoutes;
