import { useState } from 'react';

import useSocketStore from '@/stores/socketStore';

import { publishCategoryMessage } from '@/apis/websocket/reference';

import useInput from '@/hooks/_common/useInput';

import useCategoriesQuery from '@/queries/PairRoom/useCategoriesQuery';

import { validateCategoryName } from '@/validations/validateCategory';

const useEditCategory = (accessCode: string, categoryId: string, categoryName: string) => {
  const { client } = useSocketStore();
  const [isEditing, setIsEditing] = useState(false);

  const { value, handleChange, resetValue, message, status } = useInput(categoryName);

  const { isCategoryExist } = useCategoriesQuery(accessCode);

  const startEditing = () => setIsEditing(true);

  const stopEditing = () => {
    resetValue();
    setIsEditing(false);
  };

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>, prevCategoryName: string) => {
    handleChange(event, validateCategoryName(event.target.value, isCategoryExist, prevCategoryName));
  };

  const updateCategoryName = async () => {
    if (value === categoryName) {
      stopEditing();
      return;
    }

    publishCategoryMessage.update(client, accessCode, categoryId, value);
    stopEditing();
  };

  const deleteCategoryName = async () => {
    publishCategoryMessage.delete(client, accessCode, categoryId);
  };

  return {
    newCategoryName: { value, message, status },
    handleCategoryName,
    isEditing,
    startEditing,
    stopEditing,
    updateCategoryName,
    deleteCategoryName,
  };
};

export default useEditCategory;
