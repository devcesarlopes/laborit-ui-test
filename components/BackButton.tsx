import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/colors';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';

interface BackButtonProps {
  onPress?: () => void;
}


const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const router = useRouter();

  const {theme} = useThemeStore(state => state);


  return (
    <TouchableOpacity onPress={onPress ?? (() => router.back())} className="flex-row items-center p-4 rounded-2xl border border-input-border">
      <AntDesign name="left" size={14} color={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
    </TouchableOpacity>
  );
};

export default BackButton;