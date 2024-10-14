import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/AppInput";
import useChat from "./useChat";

export default function ChatScreen() {
  const {
    control, 
    errors, 
    onSubmit, 
    watch, 
  } = useChat();

  return (
    <View className="bg-background h-full">
      <View className='w-full flex-1 flex-row items-center justify-center '>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>What can I help you with?</ThemedText>
        </View>
      </View>
      <View className="w-full flex items-center mt-auto py-8">
        <Input
          name="message"
          placeholder="Send a message"
          type="outline"
          className="w-[90%] max-w-[90%] mb-2 "
          inputClassName="text-lg"
          control={control}
          errors={errors}
          onSubmit={onSubmit}
          watch={watch}
        />
      </View>
    </View>
  );
}
