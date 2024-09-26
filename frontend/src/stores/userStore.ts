import { create } from 'zustand';

type UserStatus = 'SIGNED_IN' | 'SIGNED_OUT';

interface UserStore {
  username: string;
  userStatus: UserStatus;
  setUser: (username: string, userStatus: UserStatus) => void;
}

const useUserStore = create<UserStore>((set) => ({
  username: '',
  userStatus: 'SIGNED_OUT',
  setUser: (username, userStatus) => {
    set(() => ({ username, userStatus }));
  },
}));

export default useUserStore;
