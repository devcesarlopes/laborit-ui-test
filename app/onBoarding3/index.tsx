import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from '@tanstack/react-query';
import pb from '@/lib/pb';
import { useForm } from "react-hook-form";
import { isConnectedAsync } from "@/utils";
import Toast from "react-native-root-toast";
import SkipButton from "@/components/SkipButton";
import ProcessTracker from "@/components/ProcessTracker";
import { ThemedText } from "@/components/ThemedText";
import BackButton from "@/components/BackButton";
import { Input } from "@/components/AppInput";

const robotImage = require('@/assets/images/robot.png');

export default function OnBoarding3() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetForm,
    setError,
    watch,
    getValues,
  } = useForm();

  const onSubmitFn = async (formData: any) => {
    const isConnected = await isConnectedAsync();
      if (!isConnected) {
        Toast.show('No internet connection, please connect to the internet', {
          duration: Toast.durations.LONG,
          backgroundColor: '#FA4A0C',
          textColor: '#FFF',
          containerStyle: {borderRadius: 20, paddingHorizontal: 40},
        });
        return;
      }
      
      console.log(formData);
  };

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className='w-full flex-row items-center justify-between px-10'>
        <BackButton onPress={() => router.replace('/onBoarding2')}/>
        <ThemedText type='poppins500' className='text-center text-input-text text-2xl'>Health</ThemedText>
        <SkipButton/>
      </View>
      
      <View className='w-full flex-row items-center justify-center mt-6'>
        <ProcessTracker 
          size={3} 
          current={2} 
          onPressArray={[
            '/dashboard', 
            '/onBoarding2', 
            '/onBoarding3'
          ]} />
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <ThemedText type='urbanist700' className='text-center text-brainbox text-4xl font-bold'>BrainBox</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>Remembers what user said{'\n'}earlier in the conversation</ThemedText>
        </View>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>Allows user to provide.{'\n'}follow-up corrections With Ai</ThemedText>
        </View>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>Limited knowledge of world {'\n'}and events after 2021</ThemedText>
        </View>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>May occasionally generate{'\n'}incorrect information</ThemedText>
        </View>
      </View>
      <View className='w-full flex-row items-center justify-center mt-4'>
        <View className="max-w-[90%] bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>May occasionally produce{'\n'}harmful instructions or biased content</ThemedText>
        </View>
      </View>
      <View className="w-full flex items-center mt-auto">
        <Input
          name="message"
          placeholder="Send a message"
          onSubmit={() => router.replace('/dashboard/(tabs)/chat')}
          onFocus={() => router.replace('/dashboard/(tabs)/chat')}
          type="outline"
          className="w-[90%] max-w-[90%] mb-2 "
          inputClassName="text-lg"
          control={control}
        />
      </View>
    </SafeAreaView>
  );
}
