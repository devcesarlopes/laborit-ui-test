import { router } from 'expo-router';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@/components/AppButton';
import { ThemedText } from '@/components/ThemedText';
import { ResizeMode, Video } from 'expo-av';
import { Input } from '@/components/AppInput';
import useForgotPassword from './useForgotPassword';

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default function ForgotPassword() {
  const {
    control, 
    errors, 
    validationRules, 
    onSubmit, 
    watch, 
    loading,
    formHasError,
    formErrorMessages
  } = useForgotPassword();
  return (
    <SafeAreaView className="flex flex-1">
      <View className='w-full flex-row items-center mx-10'>
        <ThemedText onPress={router.back} type='defaultRobotoMono'>&lt; back</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-40'>
          <ThemedText type='mediumRobotoMono'>FORGOT PASSWORD?</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <ThemedText type='defaultRobotoMono'>Please enter your email address.{'\n'}We’ll send you reset instructions.</ThemedText>
      </View>
      <View className='w-full flex-col items-center justify-center mt-10'>
        <Input
          name="email" 
          placeholder="Enter your email"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.email}
          showCompletionIndicator={true}
          watch={watch}
        />
      </View>
      <View className='w-full flex-row items-center justify-center mt-10'>
        <Button type="primary" className="w-[40%] max-w-80" onPress={onSubmit} loading={loading} textClassName='text-2xl'>Send Link</Button>
      </View>
      {formHasError && (
        <View className='w-full flex-col items-center justify-center mt-40'>
          <Button type="outline-red" className="w-[90%] max-w-[90%] mt-4">{formErrorMessages}</Button>
        </View>
      )}
    </SafeAreaView>
  );
}