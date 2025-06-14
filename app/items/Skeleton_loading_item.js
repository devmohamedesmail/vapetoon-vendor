import React from 'react'
import { Div, Skeleton } from 'react-native-magnus';
const Skeleton_loading_item = () => {
    return (
        <Div px={10} py={20}>
            <Skeleton.Box h={30} w={200} mb={10} />
            <Skeleton.Box h={20} w={150} mb={10} />
            <Skeleton.Box h={100} w={'100%'} />
        </Div>
    )
}

export default Skeleton_loading_item