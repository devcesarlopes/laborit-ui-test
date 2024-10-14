import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const SkipButton: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.replace('/dashboard/(tabs)/chat')} className="flex-row items-center p-4 rounded-2xl">
      <Text className="text-input-placeholder font-[poppins600]">skip</Text>
    </TouchableOpacity>
  );
};

export default SkipButton;