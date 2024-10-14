import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";
import { getErrorMessages, isConnectedAsync } from "@/utils";
import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as SecureStore from 'expo-secure-store';
import pb from '@/lib/pb';
import Toast from "react-native-root-toast";
import { router } from 'expo-router';

export const useLogin = () => {
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
    const setUser = useUserStore(state => state.setUser);
    const saveUser = useUserStore(state => state.saveUser);
    const {formHasError, formErrorMessages} = getErrorMessages(Object.keys(getValues()), errors);

    const validationRules = {
      username: {
        required: {
          value: true,
          message: 'Please enter a valid email or username',
        },
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
          message: 'Please enter a valid email',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Please enter a valid password',
        },
        pattern: {
          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
          message: 'Please enter a valid password',
        },
      },
    };
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

        console.log(formData);
  
        try {
          const user = await pb
            .collection('users')
            .authWithPassword(formData.username, formData.password);
  
          setUser(user.record as unknown as User);
          await saveUser();
          if (pb.authStore.isValid) {
            await SecureStore.setItemAsync(
              'secure_token',
              pb.authStore.exportToCookie(),
            );
            const token = await SecureStore.getItemAsync('secure_token');
            console.log(token);
          }
          // navigation.navigate(NavigationScreens.Dashboard);
          router.replace('/dashboard');
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
  };
  };
  
  export default useLogin;