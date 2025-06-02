import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'
import { colors } from '../config/colors'

const Custom_button = ({title,onPress,...props}) => {
  return (
    <Button onPress={onPress} bg={colors.primary} w={"100%"} {...props} >
        {title}
    </Button>
  )
}

export default Custom_button