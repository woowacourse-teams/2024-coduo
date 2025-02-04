import { Client } from '@stomp/stompjs';
import { create } from 'zustand';

interface SocketStore {
  client: Client | null;
  isConnected: boolean;
  accessCode: string;
  setClient: (client: Client | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setAccessCode: (accessCode: string) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  client: null,
  isConnected: false,
  accessCode: '',
  setClient: (client) => set({ client }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setAccessCode: (accessCode) => set({ accessCode }),
}));

export default useSocketStore;
