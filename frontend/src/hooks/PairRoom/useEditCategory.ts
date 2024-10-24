import { useState } from 'react';

import useToastStore from '@/stores/toastStore';

import useInput from '@/hooks/common/useInput';
import useCategories from '@/hooks/PairRoom/useCategories';

import { useDeleteCategory, useUpdateCategory } from '@/queries/PairRoom/category/mutation';

import { validateCategoryName } from '@/validations/validateCategory';

const useEditCategory = (accessCode: string, categoryId: string, categoryName: string) => {
  const { addToast } = useToastStore();

  const [isEditing, setIsEditing] = useState(false);

  const { value, handleChange, resetValue, message, status } = useInput(categoryName);

  const { isCategoryExist } = useCategories(accessCode);
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

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

    await updateCategoryMutation.mutateAsync({ categoryId, updatedCategoryName: value, accessCode });
    addToast({ status: 'SUCCESS', message: '카테고리가 수정되었습니다.' });
    stopEditing();
  };

  const deleteCategoryName = async () => {
    await deleteCategoryMutation.mutateAsync({ categoryId, accessCode });
    addToast({ status: 'SUCCESS', message: '카테고리가 삭제되었습니다.' });
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
