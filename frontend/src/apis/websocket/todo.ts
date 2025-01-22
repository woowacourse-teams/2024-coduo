import { Client } from '@stomp/stompjs';

import { publishMessage } from '@/apis/websocket/websocket';

export const publishTodoMessage = {
  add: (client: Client | null, accessCode: string, contents: string) => {
    publishMessage(client, `/topic/${accessCode}/todo/add`, { contents });
  },
  updateContents: (client: Client | null, accessCode: string, todoId: number, contents: string) => {
    publishMessage(client, `/topic/${accessCode}/todo/update/${todoId}/contents`, { contents });
  },
  updateOrder: (client: Client | null, accessCode: string, todoId: number, order: number) => {
    publishMessage(client, `/topic/${accessCode}/todo/update/${todoId}/order`, { order });
  },
  updateChecked: (client: Client | null, accessCode: string, todoId: number) => {
    publishMessage(client, `/topic/${accessCode}/todo/update/${todoId}/checked`);
  },
  delete: (client: Client | null, accessCode: string, todoId: number) => {
    publishMessage(client, `/topic/${accessCode}/todo/delete/${todoId}`);
  },
};
