import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import pb from "@/lib/pb"; // Using the PocketBase instance from pb.ts
import { useRouter } from "expo-router";
import { useThemeStore } from "@/stores/themeStore";
import { colorPalettes } from "@/color-theme";
import { ThemedText } from "@/components/ThemedText";
import { useUserStore } from "@/stores/userStore";
import { useFocusEffect } from '@react-navigation/native';

const fetchChatSessions = async () => {
  const user = useUserStore.getState().user;
  if(!user) {
    return [];
  }
  const records = await pb.collection("chats").getFullList({
    sort: "-created", filter: `user='${user.id}'`// Sort by created date in descending order
  });
  console.log('chat', user);
  console.log('chat', records.map(x => x.id));
  return records;
};

const fetchChatMessages = async () => {
  const user = useUserStore.getState().user;
  if(!user) {
    return [];
  }
  const records = await pb.collection("messages").getFullList({
    sort: "-created", filter: `user='${user.id}'` // Sort by created date in descending order
  });
  return records.map(record => ({
    id: record.id,
    user: record.user,
    chat: record.chat,
    request: record.request,
    response: record.response,
  }));
};

export default function HistoryScreen() {
  const {theme} = useThemeStore(state => state);

  const {
    data: chatSessions,
    isLoading,
    error,
    refetch: refetchChats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChatSessions,
  });

  const {
    data: chatMessages,
    isLoading: isLoadingMessages,
    error: errorMessages,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchChatMessages,
  });

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      refetchChats();
      refetchMessages();
    }, [refetchChats, refetchMessages])
  );

  if (isLoading || isLoadingMessages) {
    return (
      <View className="bg-background w-full h-full items-center justify-center">
        <ActivityIndicator color={theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text']} />
      </View>
    );
  }

  if (error || errorMessages) {
    return (
      <View className="bg-background w-full h-full items-center justify-center">
        <Text>Error loading History</Text>
      </View>
    );
  }

  if (!chatSessions || chatSessions.length === 0) {
    return (
      <View className='bg-background w-full flex-1 flex-row items-center justify-center '>
        <View className="bg-content-background py-4 px-20 rounded-3xl">
          <ThemedText type='poppins300' className='text-center text-content-text text-lg'>No Chat Sessions Available</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-background flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 72 }}
        className="p-2 py-8 flex-1"
      >
        {chatSessions.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => router.push(`/dashboard/(tabs)/chat/${item.id}`)}
              className={`p-4 flex-row rounded-lg mb-3 ${index % 2 === 1 ? 'bg-content-background' : ''}`}
            >
              <View className="flex-1">
                <ThemedText type='poppins500' className='text-left text-input-text text-xl'>{new Date(item.created).toDateString() + ' - ' + new Date(item.created).toLocaleTimeString()}</ThemedText>
                <ThemedText type='poppins300' className='text-left text-input-text'>{chatMessages?.find(x => x.chat === item.id)?.request}</ThemedText>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
