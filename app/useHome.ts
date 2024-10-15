import { useState } from 'react';
import { useRouter } from 'expo-router';
import { isConnectedAsync } from '@/utils';
import pb from '@/lib/pb';
import Toast from "react-native-root-toast";
import { OauthResponse, User } from '@/types';
import { useUserStore } from "@/stores/userStore";
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { colorPalettes } from '@/color-theme';
import { useThemeStore } from '@/stores/themeStore';

export const useHome = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore(state => state.setUser);
  const saveUser = useUserStore(state => state.saveUser);
  const {theme} = useThemeStore(state => state);

  const handleAuthSession = async (provider: string) => {
    if (loading) {
      return;
    }
    try {
      const isConnected = await isConnectedAsync();
      if (!isConnected) {
        Toast.show('No Internet Connection!', {
          duration: Toast.durations.LONG,
          backgroundColor: '#FA4A0C',
          textColor: '#FFF',
          containerStyle: { borderRadius: 20, paddingHorizontal: 40 },
        });
        return;
      }
      setLoading(true);
      const oauthResponse: OauthResponse = await pb.collection('users').authWithOAuth2({
        provider,
        urlCallback: async (url) => {
          const result = await WebBrowser.openAuthSessionAsync(url);
          if (result.type !== 'success') {
            throw new Error('Authentication was canceled or failed');
          }
        }
      }) as unknown as OauthResponse;
      const user = oauthResponse.meta.isNew ? 
        await pb.collection('users').update<User>(oauthResponse.record.id, {name: oauthResponse.meta.name, imageUrl: oauthResponse.meta.avatarUrl}, {$autoCancel: false}) :
        oauthResponse.record as unknown as User;
      setUser(user);
      await saveUser();
      if (pb.authStore.isValid) {
        await SecureStore.setItemAsync(
          'secure_token',
          pb.authStore.exportToCookie(),
        );
        const token = await SecureStore.getItemAsync('secure_token');
        console.log('SW: Secure token saved', token);
        if (Platform.OS === 'ios') {
          WebBrowser.dismissAuthSession();
        } else {
          WebBrowser.dismissBrowser();
        }
        router.replace('/dashboard');
      }
    } catch (error) {
      Toast.show('Login Failed\nSomething went wrong while processing your request.', {
        duration: Toast.durations.LONG,
        backgroundColor: '#F00',
        textColor: '#FFF',
        containerStyle: { borderRadius: 20, paddingHorizontal: 40 },
      });
      setLoading(false);
    } finally {
      console.log('SW: Resetting loading state');
      setLoading(false);
    }
  };

  const authWithGoogle = () => {
    console.log('SW: authWithGoogle called');
    handleAuthSession('google');
  };
  const authWithFacebook = () => {
    console.log('SW: authWithFacebook called');
    // handleAuthSession('facebook');
    Toast.show('Facebook Login is not setup', {
      duration: Toast.durations.LONG,
      backgroundColor: theme === 'light' ? colorPalettes.light['--color-content-background'] : colorPalettes.dark['--color-content-background'],
      textColor: theme === 'light' ? colorPalettes.light['--color-content-text'] : colorPalettes.dark['--color-content-text'],
      containerStyle: {borderRadius: 20, paddingHorizontal: 40},
    });
  };

  return {
    router,
    authWithGoogle,
    authWithFacebook,
  };
};

export default useHome;