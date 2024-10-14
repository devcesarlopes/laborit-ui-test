import { useUserStore } from "@/stores/userStore";
import { getErrorMessages, isConnectedAsync } from "@/utils";
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pb from '@/lib/pb';
import Toast from "react-native-root-toast";
import { getGroqChatCompletion } from "@/utils/groqFn";
import { router } from "expo-router";

export const useChat = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetForm,
    setError,
    watch,
    getValues,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const {user} = useUserStore(state => state);
  const {formHasError, formErrorMessages} = getErrorMessages(Object.keys(getValues()), errors);

  useEffect(() => {
    console.log('router.push session', currentChat);
    if(!currentChat) {
      return;
    }
    router.replace({
      pathname: "/dashboard/(tabs)/chat/[session]",
      params: { session: currentChat },
    });
  }, [currentChat]);

  const validationRules = {};
  const onSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const isConnected = await isConnectedAsync();
      if (!isConnected) {
        Toast.show('No internet connection, please connect to the internet', {
          duration: Toast.durations.LONG,
          backgroundColor: '#FA4A0C',
          textColor: '#FFF',
          containerStyle: {borderRadius: 20, paddingHorizontal: 40},
        });
        return;
      }
      if (!formData.message) {
        Toast.show('write a message to send', {
          duration: Toast.durations.LONG,
          backgroundColor: '#FA4A0C',
          textColor: '#FFF',
          containerStyle: {borderRadius: 20, paddingHorizontal: 40},
        });
        return;
      }

      if (formData.message.length < 2) {
        Toast.show('message must be at least 2 characters long', {
          duration: Toast.durations.LONG,
          backgroundColor: '#FA4A0C',
          textColor: '#FFF',
          containerStyle: {borderRadius: 20, paddingHorizontal: 40},
        });
        return;
      }

      try {
        let _currentChat = '';
        if (!currentChat) {
          try {
            const newChat = await pb
              .collection('chats')
              .create({user: user?.id});
            _currentChat = newChat.id;
          } catch(error) {
            throw new Error('Something went wrong while creating a chat session');
          }
        } else {
          _currentChat = currentChat;
        }
        console.log('currentChat', _currentChat);
        const chatCompletion = await getGroqChatCompletion(formData.message);
        if(!chatCompletion) {
          throw new Error('Could not connect to AI server');
        }
        const chatResponse = chatCompletion.choices[0]?.message?.content || "";

        const message = await pb.collection('messages').create({
          user: user?.id, 
          chat: _currentChat,
          request: formData.message,
          response: chatResponse
        });
        
        setCurrentChat(_currentChat);
      } catch (error) {
        console.log(error);
        const err = error as unknown as ClientResponseError;
        if (err.status === 400) {
          Toast.show('Username/Password was incorrect', {
            duration: Toast.durations.LONG,
            backgroundColor: '#FA4A0C',
            textColor: '#FFF',
            containerStyle: {borderRadius: 20, paddingHorizontal: 40},
          });
        } else if (err.status !== 200) {
          Toast.show('Something went wrong while processing your request.', {
            duration: Toast.durations.LONG,
            backgroundColor: '#FA4A0C',
            textColor: '#FFF',
            containerStyle: {borderRadius: 20, paddingHorizontal: 40},
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    errors,
    formHasError,
    formErrorMessages,
    loading,
    validationRules,
    onSubmit: handleSubmit(onSubmit),
    watch,
    currentChat,
  };
};

export default useChat;