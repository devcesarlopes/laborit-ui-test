import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";
import { getErrorMessages, isConnectedAsync } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as SecureStore from 'expo-secure-store';
import pb from '@/lib/pb';
import { router } from 'expo-router';
import Toast from "react-native-root-toast";
import { colorPalettes } from "@/color-theme";

export const useSignUp = () => {
    const {
      control,
      handleSubmit,
      formState: {errors},
      reset: resetForm,
      setError,
      watch,
      getValues,
      setValue,
      clearErrors,
    } = useForm();
    const [loading, setLoading] = useState(false);
    const {formHasError, formErrorMessages} = getErrorMessages(Object.keys(getValues()), errors);

    const setUser = useUserStore(state => state.setUser);
    const saveUser = useUserStore(state => state.saveUser);
  
    const validationRules = {
      firstName: {
        required: {
          value: true,
          message: 'First name is required',
        },
      },
      lastName: {
        required: {
          value: true,
          message: 'Last name is required',
        },
      },
      dateOfBirth: {
        required: {
          value: true,
          message: 'Date of birth is required',
        },
      },
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
      phone: {
        required: {
          value: true,
          message: 'Mobile number is required',
        },
        pattern: {
          value: /^\d+$/,
          message: 'Invalid mobile number',
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
      passwordConfirm: {
        required: {
          value: true,
          message: 'Please confirm your password',
        },
        validate: (value: string) => {
          const password = getValues('password');
          return value === password || 'Passwords do not match';
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
            backgroundColor: colorPalettes.dark["--color-tertiary"],
            textColor: colorPalettes.dark["--color-dark"],
            containerStyle: {borderRadius: 20, borderColor: colorPalettes.dark["--color-dark"], paddingHorizontal: 40},
          });
          return;
        }
  
        const data = {
          email: formData.email,
          emailVisibility: true,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          name: formData.firstName + ' ' + formData.lastName,
        };    
  
        try {
          const user = await pb.collection('users').create<User>(data);
          setUser(user);
          await saveUser();
          if (pb.authStore.isValid) {
            await SecureStore.setItemAsync(
              'secure_token',
              pb.authStore.exportToCookie(),
            );
            const token = await SecureStore.getItemAsync('secure_token');
            console.log(token);
          }
          router.replace('/dashboard');
        } catch (error) {
          console.log(error);
          Toast.show(`Something went wrong while processing your request.`, {
            duration: Toast.durations.LONG,
            backgroundColor: colorPalettes.dark["--color-tertiary"],
            textColor: colorPalettes.dark["--color-dark"],
            containerStyle: {borderRadius: 20, borderColor: colorPalettes.dark["--color-dark"], paddingHorizontal: 40},
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
        setValue,
        onSubmit: handleSubmit(onSubmit),
        watch,
    };
  };
  
  export default useSignUp;