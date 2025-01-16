import { Client } from '@stomp/stompjs';

const SOCKET_URL = process.env.REACT_SOCKET_API_URL;

export const getConnection = () => {
  return new Client({ brokerURL: `${SOCKET_URL}/ws-connect` });
};
