import { View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';

const EditInformationLayout = () => {

  return (
    <View className="bg-background h-screen w-full">
      <View className='relative w-full flex flex-row items-center py-4 mt-20'>
       <View className='absolute ml-[5%] z-10'>
        <BackButton />
       </View>
        <ThemedText type='poppins500' className='flex-1 text-center text-content-text text-2xl px-4'>Invite Friends</ThemedText>
      </View>
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
};

export default EditInformationLayout;