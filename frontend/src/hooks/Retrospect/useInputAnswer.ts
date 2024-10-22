import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddRetrospect } from '@/queries/Retrospect/useAddRetrospect';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const useInputAnswer = (pairRoomAccessCode: string) => {
  const [answer, setAnswer] = useState<string[]>(Array(RETROSPECT_QUESTIONS.length).fill(''));
  const { mutateAsync } = useAddRetrospect();
  const navigate = useNavigate();
  const handleChange = (index: number, value: string) => {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
  };

  const hasEmptyField = () => {
    return answer.some((item) => item.replace(/\s/g, '') === '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await mutateAsync({ pairRoomAccessCode, answer }).then(() => navigate(`/room/${pairRoomAccessCode}/completed`));
  };

  return { answer, handleChange, hasEmptyField, handleSubmit };
};

export default useInputAnswer;
