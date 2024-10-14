import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";
import { getErrorMessages, isConnectedAsync } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as SecureStore from 'expo-secure-store';
import pb from '@/lib/pb';
import { router } from 'expo-router';
import Toast from "react-native-root-toast";
import { colors } from "@/colors";

export const useForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetForm,
    setError,
    watch,
    getValues,
    clearErrors,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const {formHasError, formErrorMessages} = getErrorMessages(Object.keys(getValues()), errors);

  const setUser = useUserStore(state => state.setUser);
  const saveUser = useUserStore(state => state.saveUser);

  const validationRules = {
    email: {
      required: {
        value: true,
        message: 'Email is required',
      },
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        message: 'Please enter a valid email',
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
          backgroundColor: colors.tertiary,
          textColor: colors.accent.red,
          containerStyle: {borderRadius: 20, borderColor: colors.accent.red, paddingHorizontal: 40},
        });
        return;
      }

      try {
        const requestPasswordReset = await pb.collection('users').requestPasswordReset(formData.email);
        if (requestPasswordReset){
          Toast.show('Reset Password Email Successfully Sent', {
            duration: Toast.durations.LONG,
            opacity: 1,
            backgroundColor: '#6DD55C',
            textColor: '#FFF',
            containerStyle: {borderRadius: 20, paddingHorizontal: 40},
          });
        }
      } catch (error) {
        console.log('passwordReset >> onSubmit >> error >>', error);
        // const err = error as unknown as ClientResponseError;
        Toast.show('Password Reset Failed\nSomething went wrong while processing your request.', {
          duration: Toast.durations.LONG,
          backgroundColor: '#F00',
          textColor: '#FFF',
          containerStyle: {borderRadius: 20, paddingHorizontal: 40},
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
      control,
      clearErrors,
      errors,
      formHasError,
      formErrorMessages,
      loading,
      validationRules,
      onSubmit: handleSubmit(onSubmit),
      watch,
  };
};

export default useForgotPassword;