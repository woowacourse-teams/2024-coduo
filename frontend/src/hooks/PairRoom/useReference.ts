import { useState } from 'react';

import { DEFAULT_CATEGORY_ID } from '@/hooks/PairRoom/useCategories';

import { useAddReferenceLink } from '@/queries/PairRoom/reference/mutation';

const useReference = (accessCode: string, reference: string, success: () => void) => {
  const addReference = useAddReferenceLink().mutateAsync;
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const handleCurrentCategory = (category: string | null) => setCurrentCategoryId(category);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const categoryId = currentCategoryId === DEFAULT_CATEGORY_ID ? null : currentCategoryId;
    addReference({ url: reference, accessCode, categoryId }).then(() => success());
  };
  return { currentCategoryId, handleCurrentCategory, handleSubmit };
};

export default useReference;
