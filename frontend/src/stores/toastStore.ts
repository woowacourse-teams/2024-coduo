import { create } from 'zustand';

import type { Status } from '@/components/common/Toast/Toast';

interface Toast {
  status: Status;
  message: string;
}

interface ToastItem extends Toast {
  id: number;
  isOpen: boolean;
  isPush: boolean;
}

interface ToastStore {
  toastList: ToastItem[];
  addToast: (toast: Toast) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toastList: [],
  addToast: (toast: Toast) => {
    const id = Date.now();
    const toastItem = { ...toast, id, isOpen: true, isPush: false };

    set((state) => {
      return { toastList: [toastItem, ...state.toastList.map((item) => ({ ...item, isPush: true }))].slice(0, 3) };
    });

    setTimeout(() => {
      set((state) => ({
        toastList: state.toastList.map((item) => (item.id === id ? { ...item, isOpen: false } : item)),
      }));
      setTimeout(() => {
        set((state) => ({
          toastList: state.toastList.filter((item) => item.id !== id),
        }));
      }, 500);
    }, 1500);
  },
}));

export default useToastStore;
