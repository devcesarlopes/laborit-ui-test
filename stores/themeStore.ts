import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  loadTheme: () => Promise<'light' | 'dark'>;
  saveTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => {
    set(() => ({
      theme: theme,
    }));
  },
  loadTheme: async () => {
    try {
      const storedData = await AsyncStorage.getItem('theme') as 'light' | 'dark' | null;
      if (!!storedData) {
        set({ theme: storedData });
      }
      return get().theme;
    } catch (e) {
      console.log('src/app/themeStore');
      console.error('Failed to load stored theme:', e);
      return 'light';
    }
  },
  saveTheme: async () => {
    try {
      const theme = get().theme;
      await AsyncStorage.setItem('theme', theme);
    } catch (e) {
      console.log('src/app/themeStore');
      console.error('Failed to save theme:', e);
    }
  },
}));
