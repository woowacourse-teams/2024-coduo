import { Client, Message } from '@stomp/stompjs';

const SOCKET_URL = process.env.REACT_SOCKET_API_URL;

export const getConnection = () => {
  return new Client({ brokerURL: `${SOCKET_URL}/ws` });
};

export const subscribeTopic = <T>(client: Client | null, destination: string, handler: (body: T) => void) => {
  if (!client?.connected) {
    console.error('웹소켓 연결에 실패했습니다.');
    return;
  }

  client.subscribe(destination, (message: Message) => {
    const body: T = JSON.parse(message.body);
    handler(body);
  });
};

export const publishMessage = (client: Client | null, destination: string, contents?: object) => {
  if (!client?.connected) {
    console.error('[ERROR] 서버와 통신에 실패했습니다.');
    return;
  }

  client.publish({
    destination: destination,
    body: JSON.stringify(contents),
  });
};
