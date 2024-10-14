import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Href, router } from 'expo-router';

interface ProcessTrackerProps {
  size: number;
  current: number;
  onPressArray: Href<string>[];
}

const ProcessTracker: React.FC<ProcessTrackerProps> = ({ size, current, onPressArray }) => {
  return (
    <View className='flex flex-row gap-3'>
      {Array.from({ length: size }, (_, i) => i).map((i: number) => 
        current === i ? 
          <TouchableOpacity key={i} className="w-5 h-5 rounded-full border border-input-text flex items-center justify-center">
            <View className="w-3 h-3 rounded-full bg-input-text" />
          </TouchableOpacity> 
          :
          <TouchableOpacity key={i} onPress={() => router.replace(onPressArray?.[i] ?? '/dashboard')} className="w-5 h-5 rounded-full flex items-center justify-center">
            <View className="w-3 h-3 rounded-full bg-input-border" />
          </TouchableOpacity> 
      )}
    </View>
  );
};

export default ProcessTracker;