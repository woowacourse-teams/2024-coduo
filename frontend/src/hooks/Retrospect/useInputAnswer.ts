import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddRetrospect } from '@/queries/Retrospect/useAddRetrospect';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const useInputAnswer = (pairRoomAccessCode: string) => {
  const [answers, setAnswers] = useState<string[]>(Array(RETROSPECT_QUESTIONS.length).fill(''));
  const { mutateAsync } = useAddRetrospect();
  const navigate = useNavigate();
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const hasEmptyField = () => {
    return answers.some((item) => item.replace(/\s/g, '') === '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await mutateAsync({ pairRoomAccessCode, answers }).then(() => navigate(`/room/${pairRoomAccessCode}/completed`));
  };

  return { answers, handleChange, hasEmptyField, handleSubmit };
};

export default useInputAnswer;
