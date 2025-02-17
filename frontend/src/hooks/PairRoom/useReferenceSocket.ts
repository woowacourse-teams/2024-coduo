import { useState, useEffect } from 'react';

import useSocketStore from '@/stores/socketStore';

import { Reference } from '@/apis/http/referenceLink';
import { subscribeTopic } from '@/apis/websocket/websocket';

const useReference = (defaultReferences: Reference[], categoryName: string | null) => {
  const { client, isConnected, accessCode } = useSocketStore();

  const [references, setReferences] = useState<Reference[]>(defaultReferences);

  const handleReferences = (references: Reference[]) => {
    if (categoryName) {
      setReferences(references.filter((reference) => reference.categoryName === categoryName));
    }
    setReferences(references);
  };

  useEffect(() => {
    if (client && isConnected) {
      subscribeTopic<Reference[]>(client, `/topic/${accessCode}/reference-link`, handleReferences);
    }

    return () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/reference-link`);
      }
    };
  }, [client]);

  return { references };
};

export default useReference;
