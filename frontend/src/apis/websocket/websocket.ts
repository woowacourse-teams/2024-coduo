const SOCKET_URL = process.env.REACT_SOCKET_API_URL;

export const getConnection = (accessCode: string) => {
  return new WebSocket(`${SOCKET_URL}/ws-connect?accesscode=${accessCode}`);
};
