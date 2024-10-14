import { Control, Controller, FieldValues, UseFormWatch } from 'react-hook-form';
import React, { Fragment, useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { TextInputProps } from 'react-native';
import { getErrorMessage } from '@/utils';
import SendIcon from '@/assets/icons/send.svg';
import { useThemeStore } from '@/stores/themeStore';
import { colorPalettes, themes } from "@/color-theme";

export type InputProps = TextInputProps & {
  name: string;
  type: 'primary' | 'outline';
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  control?: Control<FieldValues, any>;
  rules?: any;
  errorTextClassname?: string;
  errors?: any;
  hint?: string;
  inputClassName?: string;
  isPassword?: boolean;
  showCompletionIndicator?: boolean;
  onSubmit?: () => void;
  watch?: UseFormWatch<FieldValues>;
};

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  className = '',
  inputClassName = '',
  isPassword = false,
  onSubmit,
  watch,
  ...props
}) => {
  const fieldValue = watch ? watch(props.name) : '';
  const [secureText, setSecureText] = useState(isPassword);
  const { hasError, errorMessage } = getErrorMessage(props.name, props.errors);
  const {theme} = useThemeStore(state => state);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue || ''}
      rules={props.rules}
      render={({ field: { value, onChange } }) => (
        <View className={`bg-input-background max-w-40 rounded-xl pl-8 pr-4 py-4 border-2 border-input-border flex flex-row items-center ` + className}>
          <TextInput
            value={value || ''}
            autoCapitalize='none'
            onChangeText={(text: any) => onChange(text || '')}
            placeholder={placeholder}
            className={'font-[urbanist400] text-input-text font-bold flex-1 ' + inputClassName}
            placeholderTextColor={colorPalettes[theme]['--color-input-placeholder']}
            secureTextEntry={isPassword ? secureText : false}
            {...props}
          />
          <View className="flex-row items-center">
            {isPassword && (
              <TouchableOpacity onPress={toggleSecureText} className="mr-2">
                <Text className="font-[urbanist400] text-sm text-input-text font-bold">
                  {secureText ? 'SHOW' : 'HIDE'}
                </Text>
              </TouchableOpacity>
            )}
            {!!onSubmit && (
              <TouchableOpacity onPress={onSubmit} className='pl-4'>
                <SendIcon width={25} height={25} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    />
  );
};
