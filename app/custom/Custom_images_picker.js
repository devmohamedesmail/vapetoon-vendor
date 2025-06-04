
import * as ImagePicker from 'expo-image-picker'
import { Button, Div, Image , Text } from 'react-native-magnus'
import { colors } from '../config/colors'
import Entypo from '@expo/vector-icons/Entypo';


const Custom_images_picker = ({ images = [], setImages, onImagesSelected }) => {
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true, 
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const processedImages = result.assets.map((asset, index) => {
        const uri = asset.uri;
        const fileExtension = uri.split('.').pop().toLowerCase();
        return {
          ...asset,
          fileName: `image_${index}.${fileExtension}`,
          type: `image/${fileExtension}`,
        };
      });

      if (setImages) {
        setImages(processedImages);
      }
      if (onImagesSelected) {
        onImagesSelected(processedImages);
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
      justifyContent='center' 
      alignItems='center'
      w={'100%'}
    >
      <Div flexDir="row" flexWrap="wrap" justifyContent="center">
        {images && images.length > 0 ? (
          images.map((img, idx) => (
            <Image 
              key={idx}
              source={{ uri: img.uri }} 
              h={100} 
              w={100} 
              m={5}
              rounded="lg" 
              resizeMode="cover" 
            />
          ))
        ) : (
          <Text color="gray500">No images selected</Text>
        )}
      </Div>

      <Button 
        mt={10}
        bg={colors.secondary} 
        onPress={pickImages} 
        h={50}
        // w={150}
        rounded="circle"
      >
       <Div flexDir='row' justifyContent='center' w="100%">
          <Entypo name="plus" size={20} color="white" />
          <Text mx={20} color="white">Add Images</Text>
       </Div>
      </Button>
    </Div>
  )
}

export default Custom_images_picker;
