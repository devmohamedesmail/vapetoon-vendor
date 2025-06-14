
import React from 'react'
import { Div ,Text,Button} from 'react-native-magnus';
import { colors } from '../config/colors';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const Order_item = ({order}) => {
    const navigation = useNavigation();
    return (
        <Div p={10} mb={10}  rounded="lg" flexDir='row' alignItems='center' justifyContent='space-between' bg="gray100">
            
            <Text w={50} h={50} rounded={"lg"} bg={colors.secondary} textAlign='center' color='white'>ID: {order.id}</Text>
            <Div flex={1} ml={10} flexDir='column' >
               <Text fontWeight="bold">{order.name}</Text>
               <Text fontWeight="bold">{order.phone}</Text>
               <Text fontWeight="bold">{order.address}</Text>
            </Div>
            
            <Div flexDir='column' alignItems='center' justifyContent='center'>
              <Text bg="green500" color='white' px={5} py={3} rounded="lg"> {order.order_status}</Text>
              <Button 
                px={10} 
                py={3} 
                bg={colors.primary} 
                alignSelf='center' 
                mt={10}
                h={50}
                w={50}
                rounded={"circle"}
                onPress={() => navigation.navigate('OrderDetails', { order: order })}
                > <Entypo name="eye" size={20} color="white" /> </Button>
            </Div>
        </Div>
    )
}

export default Order_item