import { useState } from 'react';

import { DEFAULT_CATEGORY_ID } from '@/hooks/PairRoom/useCategories';

import { useAddReferenceLink } from '@/queries/PairRoom/reference/mutation';

import { formatLink } from '@/utils/Reference/formatLink';

const useReference = (accessCode: string, reference: string, success: () => void) => {
  const addReference = useAddReferenceLink().mutateAsync;
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const handleCurrentCategory = (category: string | null) => setCurrentCategoryId(category);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const url = formatLink(reference);
    const categoryId = currentCategoryId === DEFAULT_CATEGORY_ID ? null : currentCategoryId;
    addReference({ url, accessCode, categoryId }).then(() => success());
  };
  return { currentCategoryId, handleCurrentCategory, handleSubmit };
};

export default useReference;
