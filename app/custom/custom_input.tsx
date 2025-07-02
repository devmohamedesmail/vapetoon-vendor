import React, { useState, ReactNode } from 'react';
import { Div, Input, Text } from 'react-native-magnus';
import { colors } from '../config/colors';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface CustomInputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  icon?: ReactNode;
  error?: string;
  secureTextEntry?: boolean;
  [key: string]: any;
}

const Custom_Input = ({
  value = '',
  placeholder = '',
  onChangeText = () => {},
  icon = null,
  error = '',
  secureTextEntry = false,
  ...props
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderSuffix = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <Div mb={16} w="100%">
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        fontSize={16}
        color={colors.primary}
        h={54}
        bg="white"
        borderWidth={1}
        borderColor={error ? "#EF4444" : "#E5E7EB"}
        focusBorderColor={error ? "#EF4444" : colors.secondary}
        rounded="xl"
        px={16}
        prefix={icon ? <Div mr={10}>{icon}</Div> : null}
        suffix={renderSuffix()}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error ? (
        <Text color="#EF4444" fontSize={12} mt={4} ml={4}>
          {error}
        </Text>
      ) : null}
    </Div>
  );
};

export default Custom_Input;