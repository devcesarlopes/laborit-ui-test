import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import SettingsIcon from '@/assets/icons/settings.svg';
import ProfileIcon from '@/assets/icons/preference-profile.svg';
import PasswordIcon from '@/assets/icons/preference-password.svg';
import WalletIcon from '@/assets/icons/preference-wallet.svg';
import InviteIcon from '@/assets/icons/preference-invite.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';

export default function PreferenceScreen() {
  const router = useRouter();
  const {theme, setTheme, saveTheme} = useThemeStore(state => state);

  const toggleTheme = async () => {
    const newTheme = useThemeStore.getState().theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await saveTheme();
  }

  return (
    <View className="bg-background w-full h-full items-center px-[5%]">
      <View className='mt-20'>
        <TouchableOpacity onPress={() => router.push('/editInformation')} className='max-w-[90%] w-full flex flex-row items-center mt-4'>
          <ProfileIcon  width={30} height={30}  fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1 px-4'>
            <ThemedText type='poppins600' className='text-left text-content-text text-xl pl-4'>Account Information</ThemedText>
            <ThemedText type='poppins400' className='text-left text-input-placeholder text-sm ml-4 mt-2'>Change your Account information</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='max-w-[90%] w-full flex flex-row items-center mt-8'>
          <PasswordIcon  width={30} height={30}  fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1 px-4'>
            <ThemedText type='poppins600' className='text-left text-content-text text-xl pl-4'>Password</ThemedText>
            <ThemedText type='poppins400' className='text-left text-input-placeholder text-sm ml-4 mt-2'>Change your Password</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='max-w-[90%] w-full flex flex-row items-center mt-8'>
          <WalletIcon  width={30} height={30}  fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1 px-4'>
            <ThemedText type='poppins600' className='text-left text-content-text text-xl pl-4'>Payment Methods</ThemedText>
            <ThemedText type='poppins400' className='text-left text-input-placeholder text-sm ml-4 mt-2'>Add Your Credit / Credit Cards</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/inviteFriends')} className='max-w-[90%] w-full flex flex-row items-center mt-8'>
          <InviteIcon  width={30} height={30} stroke={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1 px-4'>
            <ThemedText type='poppins600' className='text-left text-content-text text-xl pl-4'>Invite Your Friends</ThemedText>
            <ThemedText type='poppins400' className='text-left text-input-placeholder text-sm ml-4 mt-2'>Get $3 For Each Invitation!</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} className='max-w-[90%] w-full flex flex-row items-center mt-8'>
          <SettingsIcon  width={30} height={30}  stroke={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1 px-4'>
            <ThemedText type='poppins600' className='text-left text-content-text text-xl pl-4'>Theme Colour</ThemedText>
            <ThemedText type='poppins400' className='text-left text-input-placeholder text-sm ml-4 mt-2'>Change Your Theme Colour</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
