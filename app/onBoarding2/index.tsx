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
import { getGroqChatCompletion } from "@/utils/groqFn";
import SkipButton from "@/components/SkipButton";
import ProcessTracker from "@/components/ProcessTracker";
import { ThemedText } from "@/components/ThemedText";
import { Nagigator } from "@/components/Nagigator";

const robotImage = require('@/assets/images/robot.png');

export default function OnBoarding2() {
  const router = useRouter();

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
      const message = formData.message;
      const chatCompletion = await getGroqChatCompletion(message);

      console.log(chatCompletion.choices[0]?.message?.content || "");

  };

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className='w-full flex-col items-end px-10'>
        <SkipButton/>
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
          current={1} 
          onPressArray={[
            '/dashboard', 
            '/onBoarding2', 
            '/onBoarding3'
          ]} />
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <ThemedText type='poppins700' className='text-center text-input-text text-3xl'>Explore the{'\n'}future of AI</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-2'>
        <ThemedText type='poppins300' className='text-center text-input-placeholder text-lg'>Engage with cutting-edge AI innovations{'\n'}Discover the potential of AI today</ThemedText>
      </View>
      <View className='w-full flex-row items-center justify-center mt-8'>
        <Nagigator 
          type="primary" 
          className="w-[40%] max-w-80" 
          leftActive={true}
          rightActive={true}
          onPressLeft={() => router.replace('/dashboard')}
          onPressRight={() => router.replace('/onBoarding3')}
          textClassName='text-2xl w-full'/>
      </View>
    </SafeAreaView>
  );
}
