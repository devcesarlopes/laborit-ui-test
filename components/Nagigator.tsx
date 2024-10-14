import { TouchableOpacity, Text, View, ActivityIndicator, ColorValue, StyleSheet } from 'react-native';
import ThumbsUpIcon from '@/assets/icons/thumbsUp.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import { ReactNode } from 'react';
import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import ArrowRight from '@/assets/icons/arrowRight.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';

export interface NagigatorProps {
  onPressLeft?: (e?: any) => void;
  onPressRight?: (e?: any) => void;
  leftActive?: boolean;
  rightActive?: boolean;
  type: 'primary' | 'outline' | 'outline-red';
  icon?: 'brainbox' | 'facebook' | 'google';
  className?: string;
  textClassName?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Nagigator: React.FC<NagigatorProps> = ({ onPressLeft, onPressRight, className, leftActive, rightActive }) => {
  
  const {theme} = useThemeStore(state => state);
  const shadowStyles = StyleSheet.create({
    default: {
      shadowColor: '#0F0F0F', // Shadow color without alpha
      shadowOpacity: 0.1516,   // Alpha value from the original color
      shadowOffset: { width: 0, height: 20 }, // Offset X and Y
      shadowRadius: 32,        // Blur radius
      // Shadow for Android
      elevation: 5,
    }
  });
  
  return (
    <View style={shadowStyles.default} className={"bg-input-background relative max-w-30 rounded-xl py-3 flex flex-row justify-center " + className}>
      <TouchableOpacity className='px-8' onPress={onPressLeft}>
        {leftActive ? 
        (
          <ArrowLeft fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} width={25} height={25} /> 
        ) 
        :
        (
          <ArrowLeft fill={theme === 'light' ? colorPalettes.light['--color-input-placeholder'] : colorPalettes.dark['--color-input-placeholder']} width={25} height={25} />
        )}
      </TouchableOpacity>
      <View className='w-[0.1rem] bg-input-placeholder'/>
      <TouchableOpacity className='px-8' onPress={onPressRight}>
      {rightActive ? 
        (
          <ArrowRight fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} width={25} height={25} /> 
        ) 
        :
        (
          <ArrowRight fill={theme === 'light' ? colorPalettes.light['--color-input-placeholder'] : colorPalettes.dark['--color-input-placeholder']} width={25} height={25} />
        )}
      </TouchableOpacity>
    </View>
  );
};