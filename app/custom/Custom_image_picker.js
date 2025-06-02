import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, Div, Image } from 'react-native-magnus'
import { colors } from '../config/colors'
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';


const Custom_image_picker = ({ image, setImage, onChangeText}) => {
   



const pickImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false, 
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];
      setImage(pickedImage);
      if (onChangeText) {
        onChangeText(pickedImage.uri);
      }
    }
  };


  return (
    <Div borderColor={colors.primary} borderWidth={1} my={10} py={20} borderStyle='dashed' flexDir='column' justifyContent='center' alignItems='center'>
         {image ? (
        <Image source={{ uri: image.uri }} h={120} w={120} rounded="lg" resizeMode="cover" mb="md" />
      ) : (
        <Text color="gray500" mb="md">
         No image selected
        </Text>
      )}
        <Button bg={colors.primary} onPress={pickImage} w={'50%'} alignSelf='center' ><Entypo name="image" size={24} color="white" /></Button>
    </Div>
  )
}

export default Custom_image_picker