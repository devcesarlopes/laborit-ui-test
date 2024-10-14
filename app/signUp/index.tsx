import { router } from 'expo-router';
import { View, SafeAreaView, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@/components/AppButton';
import { ThemedText } from '@/components/ThemedText';
import { ResizeMode, Video } from 'expo-av';
import { Input } from '@/components/AppInput';
import useSignUp from './useSignUp';
import { InputDate } from '@/components/AppInputDate';
import { useDatePickerStore } from '@/stores/datePickerStore';
import BackButton from '@/components/BackButton';

export default function SignUp() {
  const {
    control, 
    errors, 
    validationRules, 
    onSubmit, 
    watch, 
    setValue,
    loading,
    formHasError,
    formErrorMessages
  } = useSignUp();
  return (
    <SafeAreaView className="bg-background flex flex-1">
      <View className='w-full flex-row items-center mx-10'>
        <BackButton/>
      </View>
      <View className='w-full flex-row items-center justify-center mt-6'>
        <ThemedText type='poppins600' className='text-center text-input-placeholder text-2xl'>CREATE AN ACCOUNT</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <ThemedText type='poppins600' className='text-center text-input-placeholder'>Please fil out the information below{'\n'}to sign up for an account.</ThemedText>
      </View>
      <View className='w-full flex-col items-center justify-center mt-20'>
        <Input
          name="firstName"
          placeholder="First Name"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.firstName}
          showCompletionIndicator={true}
          watch={watch}     
        />
        <Input
          name="lastName" 
          placeholder="Last Name"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.lastName}
          showCompletionIndicator={true}
          watch={watch}
        />
        <Input
          name="email" 
          placeholder="Email Address"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.email}
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
          secureTextEntry
        />
        <Input
          name="passwordConfirm" 
          placeholder="Password Confirm"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2"
          inputClassName="text-lg"
          control={control}
          errors={errors}
          rules={validationRules.passwordConfirm}
          showCompletionIndicator={true}
          watch={watch}
          secureTextEntry
        />
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <Button type="primary" className="w-[40%] max-w-80" onPress={onSubmit} loading={loading} textClassName='text-2xl'>Sign Up</Button>
      </View>
      {formHasError && (
        <View className='w-full flex-col items-center justify-center mt-4'>
          <Button type="outline-red" className="w-[90%] max-w-[90%] mt-4">{formErrorMessages}</Button>
        </View>
      )}
    </SafeAreaView>
  );
}