import React, { ReactNode } from 'react';
import { Button, Text, Div } from 'react-native-magnus';
import { colors } from '../config/colors';
import { ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  [key: string]: any;
}

const Custom_Button = ({
  title = '',
  onPress = () => {},
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  icon = null,
  ...props
}: CustomButtonProps) => {
  const getButtonStyle = () => {
    const baseStyle = {
      rounded: 'xl',
      fontWeight: '600' as const,
      borderWidth: 0,
    };

    // Size variants
    const sizes = {
      small: { h: 44, px: 16, fontSize: 14 },
      medium: { h: 52, px: 20, fontSize: 16 },
      large: { h: 60, px: 24, fontSize: 18 },
    };

    // Color variants
    const variants = {
      primary: {
        bg: disabled ? '#D1D5DB' : colors.primary,
        color: 'white',
      },
      secondary: {
        bg: disabled ? '#D1D5DB' : colors.secondary,
        color: 'white',
      },
      outline: {
        bg: 'transparent',
        borderWidth: 2,
        borderColor: disabled ? '#D1D5DB' : colors.primary,
        color: disabled ? '#9CA3AF' : colors.primary,
      },
      ghost: {
        bg: disabled ? '#F9FAFB' : '#F3F4F6',
        color: disabled ? '#9CA3AF' : colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizes[size],
      ...variants[variant],
    };
  };

  const buttonStyle = getButtonStyle();
  const isDisabled = disabled || loading;

  return (
    <Button
      onPress={isDisabled ? undefined : onPress}
      opacity={isDisabled ? 0.6 : 1}
      w="100%"
      {...buttonStyle}
      {...props}
    >
      <Div flexDir="row" alignItems="center" justifyContent="center">
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : 'white'}
            style={{ marginRight: 8 }}
          />
        ) : (
          icon && (
            <Div mr={8}>
              {icon}
            </Div>
          )
        )}
        <Text
          fontSize={buttonStyle.fontSize}
          fontWeight={buttonStyle.fontWeight || '600'}
          color={buttonStyle.color}
        >
          {loading ? 'Loading...' : title}
        </Text>
      </Div>
    </Button>
  );
};

export default Custom_Button;