import { Link, router } from 'expo-router';
import { View, SafeAreaView, Image, StyleSheet, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/AppButton';
import { ThemedText } from '@/components/ThemedText';
import { colors } from '@/colors';
import { ResizeMode, Video } from 'expo-av';
import { Input } from '@/components/AppInput';
import useLogin from './useLogin';
import Logo from '@/components/Logo';
import { colorPalettes } from '@/color-theme';
import { useThemeStore } from '@/stores/themeStore';
import BackButton from '@/components/BackButton';

export default function Login() {
  const {
    control, 
    errors, 
    validationRules, 
    onSubmit, 
    watch, 
    loading,
    formHasError,
    formErrorMessages
  } = useLogin();

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className='w-full flex-row items-center mx-10'>
        <BackButton/>
      </View>
      <View className='w-full flex-row items-center justify-center mt-14'>
        <Logo/>
      </View>
      <View className='w-full flex-row items-center justify-center mt-20'>
        <ThemedText type='poppins300' className='text-center text-input-placeholder'>Please login to your account using{'\n'}your username and password.</ThemedText>
      </View>
      <View className='w-full flex-col items-center justify-center mt-10'>
      <Input
          name="username"
          placeholder="Email"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.username}
          showCompletionIndicator={true}
          watch={watch}     
        />
        <Input
          name="password"
          placeholder="Password"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.password}
          showCompletionIndicator={true}
          watch={watch}     
          isPassword={true}
        />
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <Link href="/signUp" replace={true}>
          <ThemedText type='poppins300' className='text-center text-input-placeholder'>Don't have an account? Sign Up</ThemedText>
        </Link>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <Button 
          type="primary" 
          className="w-[40%] max-w-80" 
          onPress={onSubmit} 
          textClassName='text-2xl w-full'>LOGIN</Button>
      </View>
      <View className='w-full flex-col items-center justify-center mt-28'>
        <Link href="/forgotPassword" replace={true}>
          <ThemedText type='poppins300' className='text-center text-input-placeholder'>Forgot your login details?</ThemedText>
        </Link>
        {formHasError && (
          <Button type="outline-red" className="w-[90%] max-w-[90%] mt-4">{formErrorMessages}</Button>
        )}
      </View>
    </SafeAreaView>
  );
}