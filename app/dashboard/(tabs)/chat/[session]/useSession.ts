import { useUserStore } from "@/stores/userStore";
import { getErrorMessages, isConnectedAsync } from "@/utils";
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pb from '@/lib/pb';
import Toast from "react-native-root-toast";
import { getGroqChatCompletion } from "@/utils/groqFn";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useSession = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetForm,
    setError,
    watch,
    getValues,
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const {user} = useUserStore(state => state);
  const { session } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const {formHasError, formErrorMessages} = getErrorMessages(Object.keys(getValues()), errors);

  const fetchMessages = async (session: string) => {
    const records = await pb.collection('messages').getFullList({sort: 'created', filter: `chat='${session}'`});
    console.log(records);
    return records.map(record => ({
      id: record.id,
      user: record.user,
      chat: record.chat,
      request: record.request,
      response: record.response,
    }));
  };

  const { data: messagesData, isLoading: isMessagesLoading, error: messagesError } = useQuery({
    queryKey: ['session', session],
    queryFn: () => fetchMessages(Array.isArray(session) ? session[0] : session),
  });

  useEffect(() => {
    console.log('session', );
  }, [])
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
        const chatCompletion = await getGroqChatCompletion(formData.message);
        if(!chatCompletion) {
          throw new Error('Could not connect to AI server');
        }
        const chatResponse = chatCompletion.choices[0]?.message?.content || "";

        const message = await pb.collection('messages').create({
          user: user?.id, 
          chat: session,
          request: formData.message,
          response: chatResponse
        });

        queryClient.invalidateQueries({ queryKey: ['session'] });
        setValue('message', '');
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
    fetchMessages,
    messagesData,
    isMessagesLoading,
    messagesError
  };
};

export default useSession;