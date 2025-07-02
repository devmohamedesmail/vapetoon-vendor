import { Div, Text } from 'react-native-magnus'
import { colors } from '../config/colors'
import { ReactNode } from 'react'
import { Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface CustomHomeItemProps {
  title?: string;
  icon?: ReactNode;
  onPress?: () => void;
  bgColor?: string;
}

export default function Custom_Home_Item({
  title = "",
  icon = null,
  onPress = () => {},
  bgColor = "#F8FAFC"
}: CustomHomeItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: '32%', marginBottom: 15 }}
    >
      <LinearGradient
        colors={[bgColor, '#e0e7ef']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 18,
          padding: 0,
        }}
      >
        <Div
          rounded={18}
          p={14}
          h={120}
          justifyContent="center"
          alignItems="center"
          borderWidth={1}
          borderColor="#e5e7eb"
          bg="transparent"
        >
          <Div
            bg="white"
            rounded="circle"
            w={54}
            h={54}
            justifyContent="center"
            alignItems="center"
            mb={10}
            borderWidth={1}
            borderColor="#f1f5fa"
          >
            {icon}
          </Div>
          <Text
            fontSize={13}
            color={colors.primary}
            fontWeight='600'
            textAlign="center"
            numberOfLines={2}
          >
            {title}
          </Text>
        </Div>
      </LinearGradient>
    </Pressable>
  )
}