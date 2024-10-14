import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { RootSiblingParent } from 'react-native-root-siblings';
import { Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Urbanist_400Regular } from '@expo-google-fonts/urbanist';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/ThemeProviders';
import { useThemeStore } from '@/stores/themeStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    poppins700: Poppins_700Bold,
    poppins600: Poppins_600SemiBold,
    poppins500: Poppins_500Medium,
    poppins400: Poppins_400Regular,
    poppins300: Poppins_300Light,
    urbanist400: Urbanist_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const {theme, loadTheme} = useThemeStore(state => state);

  useEffect(() => {
    (async () => {
      await loadTheme();
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
    <RootSiblingParent>
    <Stack screenOptions={{headerShown: false}}/>
    </RootSiblingParent>
    </ThemeProvider>
    </QueryClientProvider>
  );
}
