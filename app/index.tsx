import { Link } from 'expo-router';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@/components/AppButton';
import { ThemedText } from '@/components/ThemedText';
import { ResizeMode, Video } from 'expo-av';
import * as WebBrowser from 'expo-web-browser';
import "react-native-url-polyfill/auto";
import EventSource from "react-native-sse";
import useHome from './useHome';
import Logo from '@/components/Logo';

// @ts-ignore
global.EventSource = EventSource;
WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {
  const {
    router,
    authWithGoogle,
    authWithFacebook,
  } = useHome();

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className='w-full flex-row items-center justify-center mt-14'>
        <Logo/>
      </View>
      <View className='w-full flex-row items-center justify-center mt-10'>
        <ThemedText type='poppins300' className='text-center text-input-placeholder'>Please choose a login option</ThemedText>
      </View>
      <View className='w-full flex-col items-center justify-center mt-20'>
        <Button type="primary" className="w-[80%] max-w-80 mt-0 mb-3" icon="brainbox" onPress={() => router.push('/login')}>Continue with Account</Button>
        <Button type="primary" className="w-[80%] max-w-80 mt-0 mb-3" icon="facebook" onPress={authWithFacebook}>Continue with Facebook</Button>
        <Button type="primary" className="w-[80%] max-w-80 mt-0 mb-3" icon="google" onPress={authWithGoogle}>Continue with Google</Button>
      </View>
      <View className='w-full flex-row items-center justify-center mt-32'>
        <Link href="/signUp">
          <ThemedText type='poppins300' className='text-center text-input-placeholder'>Don't have an account? Sign Up</ThemedText>
        </Link>
      </View>
    </SafeAreaView>
  );
}