import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CollectionKeys } from '@/constants/CollectionKeys';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (state: User | null) => void;
  loadUser: () => Promise<User | null>;
  saveUser: () => Promise<any>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: User | null) => {
    set(() => ({
      user: user,
    }));
  },
  loadUser: async () => {
    try {
      const storedData = await AsyncStorage.getItem(CollectionKeys.User);
      if (!!storedData) {
        set({ user: JSON.parse(storedData) });
      }
      return get().user;
    } catch (e) {
      console.log('src/app/userStore');
      console.error('Failed to load stored users:', e);
      return null;
    }
  },
  // Save state to AsyncStorage whenever it changes
  saveUser: async () => {
    try {
      const user = get().user;
      await AsyncStorage.setItem(CollectionKeys.User, JSON.stringify(user));
    } catch (e) {
      console.log('src/app/userStore');
      console.error('Failed to save users:', e);
    }
  },
}));
