import { useState, useEffect } from 'react';

import useSocketStore from '@/stores/socketStore';
import { subscribeTopic } from '@/apis/websocket/websocket';
import { Category } from '@/components/PairRoom/ReferenceCard/ReferenceCard.type';

const useCategory = () => {
  const { client, isConnected, accessCode } = useSocketStore();

  const [categories, setCategories] = useState<Category[]>([]);

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
