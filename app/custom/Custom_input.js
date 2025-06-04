import React from 'react';
import { Div, Input, Icon,Text } from 'react-native-magnus';
import { colors } from '../config/colors';


const Custom_input = ({value,placeholder,onChangeText,icon,error , ...props}) => {
    return (
        <Div mb={20}>
            <Input
                placeholder={placeholder}
                p={10}
                value={value}
                onChangeText={onChangeText}
                focusBorderColor={colors.primary}
                suffix={icon}
                h={55}
                {...props}
            />
            
            {error ? <Text color="red">{error}</Text> : null}
        </Div>
    )
}

export default Custom_input