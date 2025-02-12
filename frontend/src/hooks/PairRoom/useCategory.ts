import { useState, useEffect } from 'react';

import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

import useSocketStore from '@/stores/socketStore';

import { subscribeTopic } from '@/apis/websocket/websocket';

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
  }, [client]);

  return { categories };
};

export default useCategory;
