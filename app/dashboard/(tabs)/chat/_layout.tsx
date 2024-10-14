import { View, ScrollView } from 'react-native';
import React from 'react';
import { Slot, Link, usePathname } from 'expo-router';

const ChatLayout = () => {

  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default ChatLayout;
