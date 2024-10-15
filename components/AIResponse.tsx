import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes } from '@/color-theme';
import CopyIcon from '@/assets/icons/copy.svg';
import ShareIcon from '@/assets/icons/share.svg';
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";
import { ThemedText } from './ThemedText';

const AIImage = require('@/assets/images/AI-Icon.png');

interface AIResponseProps {
  response?: string;
}


const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  const router = useRouter();

  const {theme} = useThemeStore(state => state);

  const styles = StyleSheet.create({
    textStyle: {
      textAlign: 'left',       // Equivalent to 'text-left'
      color: theme === 'light' ? colorPalettes.light['--color-content-text'] : colorPalettes.dark['--color-content-text'], // Replace with actual color for 'text-content-text'
      marginTop: 16,           // Equivalent to 'mt-4' (1rem = 16 pixels)
    },
  });

  const copyToClipboard = async () => {
    if (!response) {
      return;
    }
    await Clipboard.setStringAsync(response);
    Toast.show('Text copied to Clipboard', {
      duration: Toast.durations.LONG,
      backgroundColor: theme === 'light' ? colorPalettes.light['--color-content-background'] : colorPalettes.dark['--color-content-background'],
      textColor: theme === 'light' ? colorPalettes.light['--color-content-text'] : colorPalettes.dark['--color-content-text'],
      containerStyle: {borderRadius: 20, paddingHorizontal: 40},
    });
  }

  return (
    <View className='w-full bg-content-background flex items-center py-8'>
      <View className='w-[90%] flex flex-col items-center'>
        <View className='w-full flex flex-row items-center'>
          <Image
            source={AIImage}
            className="h-15 w-15 rounded-lg"
            resizeMode='cover'
          />
          <View className='flex-1'/>
          <View className='flex flex-row gap-4'>
            <TouchableOpacity onPress={copyToClipboard}>
              <CopyIcon width={18} height={18} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShareIcon width={18} height={18} />
            </TouchableOpacity> 
          </View>
        </View>
        {/* <MarkdownTextInput scrollEnabled={false} multiline={true} className='text-left text-content-text mt-4 font-[urbanist500]'>{response}</MarkdownTextInput> */}
        <ThemedText type='urbanist500' className='text-left text-content-text mt-4'>{response}</ThemedText>
      </View>
    </View>
  );
};

export default AIResponse;