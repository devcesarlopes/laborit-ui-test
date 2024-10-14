import { View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';

const ChatSessionLayout = () => {

  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default ChatSessionLayout;