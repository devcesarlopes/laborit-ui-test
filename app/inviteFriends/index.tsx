import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import pb from '@/lib/pb';
import { ThemedText } from '@/components/ThemedText';
import CopyIcon from '@/assets/icons/invite-Icon.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";

const ilustrationLight = require('@/assets/images/Illustration-light.png');
const ilustrationDark = require('@/assets/images/Illustration-dark.png');

export default function InviteFriendsScreen() {
  const {theme} = useThemeStore(state => state);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('BrainAiPartnerMR');
    Toast.show('Text copied to Clipboard', {
      duration: Toast.durations.LONG,
      backgroundColor: theme === 'light' ? colorPalettes.light['--color-content-background'] : colorPalettes.dark['--color-content-background'],
      textColor: theme === 'light' ? colorPalettes.light['--color-content-text'] : colorPalettes.dark['--color-content-text'],
      containerStyle: {borderRadius: 20, paddingHorizontal: 40},
    });
  }

  return (
    <View className="bg-background w-full h-full items-center px-[5%]">
      <Image
        source={theme === 'light' ? ilustrationLight : ilustrationDark}
        className="h-50 w-full mx-auto mt-20"
        resizeMode="contain"
      />
      <View className='w-full mt-10'/>
      <ThemedText type='poppins600' className='text-center text-input-text text-2xl mt-2'>Refer A Friend</ThemedText>
      <ThemedText type='poppins300' className='text-center text-input-placeholder text-md mt-2'>Share Your Promo Code & Get $3{'\n'}For Each Friend</ThemedText>
      <TouchableOpacity onPress={copyToClipboard} className='w-[90%] flex flex-row mt-20 items-center justify-around border border-input-text rounded-2xl py-4'>
        <ThemedText type='poppins500' className='text-center text-input-text text-2xl mt-2'>BrainAiPartnerMR</ThemedText>
        <CopyIcon width={25} height={25} fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']}/>
      </TouchableOpacity>
    </View>
  );
}
