import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, Div, Image } from 'react-native-magnus'
import { colors } from '../config/colors'
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';

const Custom_image_picker = ({ image, setImage, onImageSelected }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];
      
      // Ensure we have the file extension
      const uri = pickedImage.uri;
      const fileExtension = uri.split('.').pop().toLowerCase();
      
      const processedImage = {
        ...pickedImage,
        fileName: `image.${fileExtension}`,
        type: `image/${fileExtension}`
      };

      if (setImage) {
        setImage(processedImage);
      }
      if (onImageSelected) {
        onImageSelected(processedImage);
      }
    }
  };

  return (
    <Div 
      borderColor={colors.primary} 
      borderWidth={1} 
      my={5} 
      py={10} 
      px={10}
      borderStyle='dashed' 
      flexDir='column' 
      justifyContent='center' 
      alignItems='center'
      w={120}
      h={120}
    >
      {image ? (
        <Image 
          source={{ uri: image.uri }} 
          h={100} 
          w={100} 
          rounded="lg" 
          resizeMode="cover" 
        />
      ) : (
        <Button 
          bg={colors.primary} 
          onPress={pickImage} 
          h={40}
          w={40}
          rounded="circle"
        >
          <Entypo name="plus" size={24} color="white" />
        </Button>
      )}
    </Div>
  )
}

export default Custom_image_picker