import { TouchableOpacity, Text, View, ActivityIndicator, ColorValue, StyleSheet } from 'react-native';
import ThumbsUpIcon from '@/assets/icons/thumbsUp.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import { ReactNode } from 'react';
import LogoIcon from '@/assets/icons/logo-small.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';

export interface ButtonProps {
  onPress?: (e?: any) => void;
  type: 'primary' | 'outline' | 'outline-red';
  icon?: 'brainbox' | 'facebook' | 'google';
  children: string | ReactNode;
  className?: string;
  textClassName?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onPress, type, children, icon, loading, className, textClassName, disabled = false }) => {
  
  const {theme} = useThemeStore(state => state);
  
  const buttonStylesMap = {
    primary: "bg-input-background relative max-w-40 rounded-3xl px-6 py-3 flex flex-row justify-center ",
    outline: `bg-text-primary max-w-40 rounded-full ${!icon ? 'px-4 py-3' : 'pl-6 pr-10 py-4'} border-2 border-background-accent1 flex flex-row `,
    ['outline-red']: "bg-tertiary max-w-40 rounded-full px-6  mt-4 mb-8 border-2 border-accent-red flex flex-row",
  };
  const buttonStyles = (buttonStylesMap[type] || buttonStylesMap['primary']) + className ?? '';

  const textStylesMap = {
    primary: "font-[poppins500] text-input-text text-center ",
    outline: `font-[RobotoMono400] text-background-accent1 font-bold `,
    ['outline-red']: "font-[RobotoMono400] text-accent-red font-bold text-center ",
  };
  const textStyles = (textStylesMap[type] || textStylesMap['primary']) + textClassName ?? '';

  const shadowStyles = StyleSheet.create({
    primary: {
      shadowColor: '#0F0F0F', // Shadow color without alpha
      shadowOpacity: 0.1516,   // Alpha value from the original color
      shadowOffset: { width: 0, height: 20 }, // Offset X and Y
      shadowRadius: 32,        // Blur radius
      // Shadow for Android
      elevation: 5,
    },
    outline: {},
    ['outline-red']: {},
  });
  
  return (
    <TouchableOpacity style={shadowStyles[type]} className={buttonStyles} onPress={onPress} disabled={disabled}>
      {!!icon && (
        <View className='pr-6'>
          {icon === 'brainbox' && (
            <LogoIcon fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} width={18} height={18} />
          )}
          {icon === 'facebook' && (
            <FacebookIcon width={18} height={18} />
          )}
          {icon === 'google' && (
            <GoogleIcon width={18} height={18} />
          )}
        </View>
      )}
      {loading ? (
        <ActivityIndicator color={'#FFF'} className="py-1 px-3" />
      ) : (
        <Text className={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};