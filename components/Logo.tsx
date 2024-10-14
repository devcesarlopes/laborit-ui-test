import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import LogoIcon from '@/assets/icons/logo.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';

export default function Logo() {

  const {theme} = useThemeStore(state => state);

  return (
    <View className='flex items-center'>
      <LogoIcon width={100} height={100} fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']}/>
      <ThemedText type='poppins500' className='text-3xl text-input-text'>BrainBox</ThemedText>
      <ThemedText type='poppins300' className='text-input-placeholder'>Version 1.0</ThemedText>
    </View>
  )
}