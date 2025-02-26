import { Client, Message } from '@stomp/stompjs';

const SOCKET_URL = process.env.REACT_SOCKET_API_URL;

export const getConnection = () => {
  return new Client({ brokerURL: `${SOCKET_URL}/ws` });
};

export const subscribeTopic = <T>(client: Client | null, destination: string, handler: (body: T) => void) => {
  if (!client) {
    console.error('웹소켓 클라이언트가 없습니다.');
    return;
  }

  const subscribe = () => {
    if (client.connected) {
      client.subscribe(destination, (message: Message) => {
        const body: T = JSON.parse(message.body);
        handler(body);
      });
    } else {
      console.error('웹소켓 연결에 실패했습니다.');
    }
  };

  client.onConnect = () => {
    console.log('웹소켓 연결이 성공적으로 재설정되었습니다.');
    subscribe();
  };

  client.onDisconnect = () => {
    console.warn('웹소켓 연결이 해제되었습니다.');
  };

  subscribe();
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
