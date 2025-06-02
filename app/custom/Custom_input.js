import React from 'react';
import { Div, Input, Icon } from 'react-native-magnus';
import { colors } from '../config/colors';


const Custom_input = ({value,placeholder,onChangeText,icon}) => {
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
            />
        </Div>
    )
}

export default Custom_input