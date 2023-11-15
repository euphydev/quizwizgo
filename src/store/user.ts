import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserState = {
  userName: string;
  setUserName: (userName: string) => void;
};

const userStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userName: '',
        setUserName: (userName: string) => set({ userName }),
      }),
      {
        name: 'user-store',
      },
    ),
  ),
);

export { userStore };
