import React from "react";
import {
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import SkipButton from "@/components/SkipButton";
import ProcessTracker from "@/components/ProcessTracker";
import { ThemedText } from "@/components/ThemedText";
import { Nagigator } from "@/components/Nagigator";

const robotImage = require('@/assets/images/robot.png');

export default function IndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className='w-full flex-col items-end px-10'>
        <SkipButton />
      </View>
      <View className="w-full" style={{
        shadowColor: '#0F0F0F', // Shadow color without alpha
        shadowOpacity: 0.9516,   // Alpha value from the original color
        shadowOffset: { width: 10, height: 20 }, // Offset X and Y
        shadowRadius: 35,        // Blur radius
        // Shadow for Android
        elevation: 5,
      }}>
        <Image
          source={robotImage}
          className="h-100 rounded-3xl mx-auto p-10"
          resizeMode="contain"
        />
      </View>
      <View className='w-full flex-row items-center justify-center mt-6'>
        <ProcessTracker
          size={3}
          current={0}
          onPressArray={[
            '/dashboard',
            '/onBoarding2',
            '/onBoarding3'
          ]} />
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <ThemedText type='poppins700' className='text-center text-input-text text-3xl'>Unlock the Power{'\n'}Of future AI</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-2'>
        <ThemedText type='poppins300' className='text-center text-input-placeholder text-lg'>Chat with the smartest AI Future{'\n'}Experience power of AI with us</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <Nagigator
          type="primary"
          className="w-[40%] max-w-80"
          rightActive={true}
          onPressRight={() => router.replace('/onBoarding2')}
          textClassName='text-2xl w-full' />
      </View>
    </SafeAreaView>
  );
}
