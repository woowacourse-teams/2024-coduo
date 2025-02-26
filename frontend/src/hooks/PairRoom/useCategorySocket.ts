import { useState, useEffect } from 'react';

import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useSocketStore from '@/stores/socketStore';

import { subscribeTopic } from '@/apis/websocket/websocket';

export const DEFAULT_CATEGORY_ID = '0';
export const DEFAULT_CATEGORY_VALUE = '전체';

const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  value: DEFAULT_CATEGORY_VALUE,
};

const useCategory = (defaultCategories: Category[]) => {
  const { client, isConnected, accessCode } = useSocketStore();

  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const handleCategories = (categories: Category[]) => setCategories(categories);

  useEffect(() => {
    if (client && isConnected) {
      subscribeTopic<Category[]>(client, `/topic/${accessCode}/category`, handleCategories);
    }

    return () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/category`);
      }
    };
  }, [client, isConnected]);

  return { categories: [DEFAULT_CATEGORY, ...(categories || [])] };
};

export default useCategory;
