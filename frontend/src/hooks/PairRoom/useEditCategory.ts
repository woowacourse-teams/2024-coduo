import { useState } from 'react';

import useToastStore from '@/stores/toastStore';

import useInput from '@/hooks/common/useInput';
import useCategories from '@/hooks/PairRoom/useCategories';

import { useDeleteCategory, useUpdateCategory } from '@/queries/PairRoom/category/mutation';

import { validateCategory } from '@/validations/validateCategory';

const useEditCategory = (accessCode: string, categoryName: string, categoryId: string) => {
  const { addToast } = useToastStore();

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

  const editCategory = (event: React.ChangeEvent<HTMLInputElement>, prevCategoryName: string) => {
    handleChange(event, validateCategory(event.target.value, isCategoryExist, prevCategoryName));
  };

  const updateCategory = async () => {
    if (value === categoryName) return;
    if (status === 'ERROR') return;
    await updateCategoryMutation.mutateAsync({
      categoryId,
      updatedCategoryName: value,
      accessCode,
    });
    setIsEditing(false);
    addToast({ status: 'SUCCESS', message: '카테고리 이름이 수정되었어요.' });
  };

  const deleteCategory = async () => {
    await deleteCategoryMutation.mutateAsync({ categoryId, accessCode });
    addToast({ status: 'SUCCESS', message: '카테고리가 삭제되었어요.' });
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
