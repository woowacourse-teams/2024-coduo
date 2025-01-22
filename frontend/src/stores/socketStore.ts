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
  setAccessCode: (accessCode) => set({ accessCode }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));

export default useSocketStore;
