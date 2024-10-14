import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import pb from '@/lib/pb';
import { ThemedText } from '@/components/ThemedText';
import SettingsIcon from '@/assets/icons/settings.svg';
import LockIcon from '@/assets/icons/lock.svg';
import HelpIcon from '@/assets/icons/help.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import { colorPalettes } from '@/color-theme';
import { useThemeStore } from '@/stores/themeStore';
import { useUserStore } from '@/stores/userStore';

const robotImage = require('@/assets/images/robot-md.png');

export default function ProfileScreen() {
  const router = useRouter();
  const {user} = useUserStore(state => state);
  const {theme} = useThemeStore(state => state);

  const handleLogout = async () => {
    try {
      await pb.authStore.clear(); // Clear the authentication store
      router.push('/'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View className="bg-background w-full h-full items-center px-[5%]">
      <View className="flex flex-col justify-center items-center mt-12">
        <View className='relative'>
          <Image
            source={robotImage}
            className="h-30 w-25 rounded-full"
            resizeMode="contain"
          />
          <View className='absolute z-10 bottom-0 right-0 mr-5 bg-[#FFF] rounded-full'>
            <View className="w-5 h-5 rounded-full border border-input-text flex items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-green-500" />
            </View> 
          </View>
        </View>
        <ThemedText type='poppins600' className='text-center text-input-text text-2xl mt-2'>{user?.name}</ThemedText>
        <ThemedText type='poppins300' className='text-center text-input-placeholder text-md mt-2'>{user?.email}</ThemedText>
      </View>
      <View className='mt-6'>
      <TouchableOpacity onPress={() => router.push('/preference')} className='max-w-[90%] w-full flex flex-row items-center py-4 mt-10'>
      <SettingsIcon width={40} height={40} stroke={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <ThemedText type='poppins500' className='flex-1 text-left text-content-text text-xl px-4'>Preferences</ThemedText>
          <ChevronRightIcon  width={18} height={18} />
        </TouchableOpacity>
        <TouchableOpacity className='max-w-[90%] w-full flex flex-row items-start pt-4'>
          <LockIcon  width={40} height={40} stroke={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <View className='flex-1'>
            <ThemedText type='poppins500' className='text-left text-content-text text-xl pl-4'>Account Security</ThemedText>
            <View className='max-w-[55%] h-2 bg-input-placeholder rounded-full mt-2 relative ml-4 mt-6'>
              <View className='h-full w-[70%] bg-input-text rounded-full'/>
            </View>
            <ThemedText type='poppins500' className='text-left text-input-placeholder text-xl ml-4 mt-6'>Excellent</ThemedText>
          </View>
          <ChevronRightIcon  width={18} height={18} style={{marginTop: 10}} />
        </TouchableOpacity>
        <TouchableOpacity className='max-w-[90%] w-full flex flex-row items-center py-4'>
          <HelpIcon  width={40} height={40} stroke={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <ThemedText type='poppins500' className='flex-1 text-left text-content-text text-xl px-4'>Customer Support</ThemedText>
          <ChevronRightIcon  width={18} height={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} className='max-w-[90%] w-full flex flex-row items-center py-4'>
          <LogoutIcon  width={40} height={40} fill={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
          <ThemedText type='poppins500' className='flex-1 text-left text-content-text text-xl px-4'>Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
