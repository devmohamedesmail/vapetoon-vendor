import React from 'react'
import { Button, Text,Div } from 'react-native-magnus';


const Button_tab = ({ color, bg, icon, title, onPress }) => {
    return (
        <Button

            bg={bg}
            color={color}
            px={12}
            py={8}
            rounded="md"
            mx={2}
            onPress={onPress}
        >
            <Div flexDir='row' alignItems='center' justifyContent='center'>
                {icon}
                <Text color='white' mx={4}>{title}</Text>
            </Div>

        </Button>
    )
}

export default Button_tab