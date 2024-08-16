import { create } from 'zustand';

import { getIsUserLoggedIn } from '@/apis/oauth';

type UserStatus = 'SIGNED_IN' | 'SIGNED_OUT';

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

getIsUserLoggedIn().then((response) => {
  useUserStatusStore.getState().setUserStatus(response.signedIn ? 'SIGNED_IN' : 'SIGNED_OUT');
});

export default useUserStatusStore;
