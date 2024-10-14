import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/colors';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';
import EditIcon from '@/assets/icons/edit.svg';
import { ThemedText } from './ThemedText';

const robotImage = require('@/assets/images/robot-small.png');

interface UserRequestProps {
  request?: string;
}


const UserRequest: React.FC<UserRequestProps> = ({ request }) => {
  const router = useRouter();

  const {theme} = useThemeStore(state => state);


  return (
    <View className='max-w-[90%] w-full flex flex-row items-center py-8'>
      <Image
        source={robotImage}
        className="h-15 w-15 rounded-lg"
        resizeMode='cover'
      />
      <ThemedText type='urbanist500' className='flex-1 text-left text-content-text px-4'>{request}</ThemedText>
      <TouchableOpacity>
        <EditIcon  width={18} height={18} />
      </TouchableOpacity>
    </View>
  );
};

export default UserRequest;