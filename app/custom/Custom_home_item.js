
import { Button, Div, Image ,Text} from 'react-native-magnus'

export default function Custom_home_item({title,icon,onPress}) {
  return (
    <Button onPress={onPress} bg='white' w="32%" h={100} rounded="lg" mb={10}>
        <Div flexDir='column' justifyContent='center' alignItems='center'>
            <Image
            w={50}
            h={50}
            source={icon} />
            <Text mt={10} color='black' fontWeight='bold'>{title}</Text>
        </Div>
    </Button>
  )
}