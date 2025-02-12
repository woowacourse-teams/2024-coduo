import { useState, useEffect } from 'react';

import useSocketStore from '@/stores/socketStore';
import { Reference } from '@/apis/http/referenceLink';
import { subscribeTopic } from '@/apis/websocket/websocket';

const useReferenceLink = () => {
  const { client, isConnected, accessCode } = useSocketStore();

  const [referenceLinks, setReferenceLinks] = useState<Reference[]>([]);

  const handleReferenceLinks = (referenceLinks: Reference[]) => setReferenceLinks(referenceLinks);

  useEffect(() => {
    if (client && isConnected) {
      subscribeTopic<Reference[]>(client, `/topic/${accessCode}/reference-link`, handleReferenceLinks);
    }

    return () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/reference-link`);
      }
    };
  }, [client]);

  return { referenceLinks };
};

export default useReferenceLink;
