import { Client } from '@stomp/stompjs';

import { publishMessage } from '@/apis/websocket/websocket';

export const publishReferenceMessage = {
  add: (client: Client | null, accessCode: string, url: string, categoryId: string | null) => {
    publishMessage(client, `/send/${accessCode}/referenceLink/post`, { url, categoryId });
  },
  delete: (client: Client | null, accessCode: string, referenceLinkId: number) => {
    publishMessage(client, `/send/${accessCode}/referenceLink/delete/${referenceLinkId}`);
  },
};

export const publishCategoryMessage = {
  add: (client: Client | null, accessCode: string, categoryName: string) => {
    publishMessage(client, `/send/${accessCode}/category/post`, { categoryName });
  },
  update: (client: Client | null, accessCode: string, categoryId: number, categoryName: string) => {
    publishMessage(client, `/send/${accessCode}/category/update/${categoryId}/name`, { categoryName });
  },
  delete: (client: Client | null, accessCode: string, categoryId: number) => {
    publishMessage(client, `/send/${accessCode}/category/delete/${categoryId}`);
  },
};
