import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useToastStore from '@/stores/toastStore';

import { useAddRetrospect } from '@/queries/Retrospect/useAddRetrospect';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const useInputAnswer = (accessCode: string) => {
  const { addToast } = useToastStore();

  const [answers, setAnswers] = useState<string[]>(Array(RETROSPECT_QUESTIONS.length).fill(''));

  const { mutateAsync, isPending } = useAddRetrospect();

  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1000) return;

    const newAnswer = [...answers];
    newAnswer[index] = value;

    setAnswers(newAnswer);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isPending) return;

    await mutateAsync({ accessCode, answers }).then(() => {
      addToast({ status: 'SUCCESS', message: '회고 작성이 완료되었습니다.' });
      navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true });
    });
  };

  return { answers, handleChange, handleSubmit };
};

export default useInputAnswer;
