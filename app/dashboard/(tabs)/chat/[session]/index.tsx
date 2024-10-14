import { View, ScrollView } from 'react-native';
import React from 'react';
import { Input } from '@/components/AppInput';
import { useSession } from './useSession';
import UserRequest from '@/components/UserRequest';
import AIResponse from '@/components/AIResponse';


const Index = () => {

  const {
    control, 
    errors, 
    onSubmit, 
    watch, 
    messagesData  
  } = useSession();

  return (
    <View className="bg-background h-full">
      <ScrollView>
        {messagesData?.map((message: any, index: number) => (
          <View key={index} className='w-full flex flex-col items-center'>
            <UserRequest request={message.request}/>
            <AIResponse response={message.response}/>
          </View>
        ))}
      </ScrollView>
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
};

export default Index;