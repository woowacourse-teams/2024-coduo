import { useState } from 'react';

import useInput from '@/hooks/_common/useInput';

import useCategoriesMutation from '@/queries/PairRoom/useCategoriesMutation';
import useCategoriesQuery from '@/queries/PairRoom/useCategoriesQuery';

import { validateCategoryName } from '@/validations/validateCategory';

const useEditCategory = (accessCode: string, categoryId: string, categoryName: string) => {
  const [isEditing, setIsEditing] = useState(false);

  const { value, handleChange, resetValue, message, status } = useInput(categoryName);

  const { isCategoryExist } = useCategoriesQuery(accessCode);
  const { updateCategoryMutation, deleteCategoryMutation } = useCategoriesMutation();

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

    updateCategoryMutation({ categoryId, updatedCategoryName: value, accessCode });
    stopEditing();
  };

  const deleteCategoryName = async () => {
    deleteCategoryMutation({ categoryId, accessCode });
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
