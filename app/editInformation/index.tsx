import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import pb from '@/lib/pb';
import { ThemedText } from '@/components/ThemedText';
import SettingsIcon from '@/assets/icons/settings.svg';
import ProfileIcon from '@/assets/icons/preference-profile.svg';
import PasswordIcon from '@/assets/icons/preference-password.svg';
import WalletIcon from '@/assets/icons/preference-wallet.svg';
import InviteIcon from '@/assets/icons/preference-invite.svg';
import { useThemeStore } from '@/stores/themeStore';

const robotImage = require('@/assets/images/robot-md.png');

export default function PreferenceScreen() {
  const router = useRouter();
  const user = pb.authStore.model; // Assuming the user model is stored here

  return (
    <View className="bg-background w-full h-full">
      <View className='w-full flex-1 flex-row items-center justify-center '>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>Screen in Development</ThemedText>
        </View>
      </View>
    </View>
  );
}
