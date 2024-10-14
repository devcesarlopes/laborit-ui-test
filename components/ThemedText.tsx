import { Text, type TextProps, StyleSheet } from 'react-native';

import { colors } from '@/colors';

export type ThemedTextProps = TextProps & {
  className?: string;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'poppins700' | 'poppins600' | 'poppins500' | 'poppins400' | 'poppins300' | 'urbanist700' | 'urbanist500' | 'subtitle' | 'link' | 'defaultRobotoMono' | 'mediumRobotoMono';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const styles = (
    type === 'urbanist700' ? 'font-[urbanist700] ' :
    type === 'urbanist500' ? 'font-[urbanist500] ' :
    type === 'poppins700' ? 'font-[poppins700] ' :
    type === 'poppins600' ? 'font-[poppins600] ' :
    type === 'poppins400' ? 'font-[poppins400] ' :
    type === 'poppins500' ? 'font-[poppins500] ' :
    type === 'poppins300' ? 'font-[poppins300] ' :
    ''
  ) + className;

  return (
    <Text
      className={styles}
      {...rest}
    />
  );
}
