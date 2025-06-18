
import { Button, Div, Image, Text } from 'react-native-magnus'
import { colors } from '../config/colors'

export default function Custom_home_item({title, icon, onPress, bgColor = "#F8FAFC"}) {
  return (
    <Button 
      onPress={onPress} 
      bg={bgColor}
      w="32%" 
      h={120} 
      rounded="2xl" 
      mb={15}
      shadow="sm"
      borderWidth={0}
      p={12}
    >
      <Div flexDir='column' justifyContent='center' alignItems='center' flex={1}>
        <Div
          bg="white"
          rounded="circle"
          w={60}
          h={60}
          justifyContent="center"
          alignItems="center"
          mb={8}
          shadow="xs"
        >
          <Image
            w={35}
            h={35}
            source={icon}
          />
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
    </Button>
  )
}