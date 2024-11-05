import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMutateRetrospect from '@/queries/Retrospect/useMutateRetrospect';

import { RETROSPECT_QUESTIONS } from '@/constants/retrospect';

const useInputAnswer = (accessCode: string) => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<string[]>(Array(RETROSPECT_QUESTIONS.length).fill(''));

  const { addRetrospectMutation } = useMutateRetrospect();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1000) return;

    const newAnswer = [...answers];
    newAnswer[index] = value;

    setAnswers(newAnswer);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    addRetrospectMutation(
      { accessCode, answers },
      { onSuccess: () => navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true }) },
    );
  };

  return { answers, handleChange, handleSubmit };
};

export default useInputAnswer;
