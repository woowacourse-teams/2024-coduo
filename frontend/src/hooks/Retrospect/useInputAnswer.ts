import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useToastStore from '@/stores/toastStore';

import { useAddRetrospect } from '@/queries/Retrospect/useAddRetrospect';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const useInputAnswer = (accessCode: string) => {
  const { addToast } = useToastStore();

  const [answers, setAnswers] = useState<string[]>(Array(RETROSPECT_QUESTIONS.length).fill(''));

  const { mutateAsync } = useAddRetrospect();

  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1000) return;

    const newAnswer = [...answers];
    newAnswer[index] = value;

    setAnswers(newAnswer);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await mutateAsync({ accessCode, answers }).then(() => {
      addToast({ status: 'SUCCESS', message: '회고 작성 완료!' });
      navigate(`/room/${accessCode}/completed`, { state: { valid: true } });
    });
  };

  return { answers, handleChange, handleSubmit };
};

export default useInputAnswer;
