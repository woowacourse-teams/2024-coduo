import { create } from 'zustand';

type UserStatus = 'SIGNED_IN' | 'SIGNED_OUT' | 'SIGN_UP';

interface UserStatusStore {}

interface UserStatusStore {
  userStatus: UserStatus;
  setUserStatus: (userStatus: UserStatus) => void;
}

const useUserStatusStore = create<UserStatusStore>((set) => ({
  userStatus: 'SIGNED_OUT',
  setUserStatus: (userStatus) => {
    set(() => ({
      userStatus,
    }));
  },
}));

export default useUserStatusStore;
