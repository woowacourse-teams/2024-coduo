import { Client } from '@stomp/stompjs';

import { publishMessage } from '@/apis/websocket/websocket';

export const publishReferenceMessage = {
  add: (client: Client | null, accessCode: string, url: string, categoryId: string | null) => {
    publishMessage(client, `/send/${accessCode}/reference-link/post`, { url, categoryId });
  },
  delete: (client: Client | null, accessCode: string, referenceLinkId: number) => {
    publishMessage(client, `/send/${accessCode}/reference-link/delete/${referenceLinkId}`);
  },
};

export const publishCategoryMessage = {
  add: (client: Client | null, accessCode: string, value: string) => {
    publishMessage(client, `/send/${accessCode}/category/post`, { value });
  },
  update: (client: Client | null, accessCode: string, categoryId: string, value: string) => {
    publishMessage(client, `/send/${accessCode}/category/update/${categoryId}`, { value });
  },
  delete: (client: Client | null, accessCode: string, categoryId: string) => {
    publishMessage(client, `/send/${accessCode}/category/delete/${categoryId}`);
  },
};
