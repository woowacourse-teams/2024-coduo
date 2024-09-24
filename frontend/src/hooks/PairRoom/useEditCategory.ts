import { useState } from 'react';

import { validateCategory } from '@/validations/validateCategory';

import useInput from '@/hooks/common/useInput';
import useCategories from '@/hooks/PairRoom/useCategories';

import { useDeleteCategory, useUpdateCategory } from '@/queries/PairRoom/category/mutation';

const useEditCategory = (accessCode: string, categoryName: string, categoryId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const { value, handleChange, resetValue, message, status } = useInput(categoryName);
  const { isCategoryExist } = useCategories(accessCode);

  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false);
    resetValue();
  };

  const editCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, validateCategory(event.target.value, isCategoryExist));
  };

  const updateCategory = async () => {
    if (status === 'ERROR') return;
    await updateCategoryMutation.mutateAsync({
      categoryId,
      updatedCategoryName: value,
      accessCode,
    });
    setIsEditing(false);
  };

  const deleteCategory = () => {
    deleteCategoryMutation.mutate({ categoryId, accessCode });
  };

  return {
    isEditing,
    categoryInputData: { value, message, status },
    actions: {
      startEditing,
      cancelEditing,
      editCategory,
      updateCategory,
      deleteCategory,
    },
  };
};

export default useEditCategory;
