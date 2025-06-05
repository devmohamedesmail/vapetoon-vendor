
import * as ImagePicker from 'expo-image-picker'
import { Button, Div, Image,Text } from 'react-native-magnus'
import { colors } from '../config/colors'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const Custom_image_picker = ({ image, setImage, onImageSelected, label }) => {


  const { t } = useTranslation();




  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];
      const uri = pickedImage.uri;
      const fileExtension = uri.split('.').pop().toLowerCase();

      const processedImage = {
        ...pickedImage,
        fileName: `image.${fileExtension}`,
        type: `image/${fileExtension}`,
      };

      if (setImage) {
        setImage(processedImage); // For single image
      }
      if (onImageSelected) {
        onImageSelected(processedImage);
      }
    }
  };

  const removeImage = () => {
    if (setImage) setImage(null);
  };

  return (
    <Div
      borderColor={colors.primary}
      borderWidth={1}
      w="100%"
      my={5}
      py={10}
      px={10}
      borderStyle="dashed"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH={140}
      bg="white"
    >
      {label && <Text fontWeight='bold'>{label}</Text>}
      {image ? (
        <Div alignItems="center"  p={20} position='relative'>
          <Image
            source={{ uri: image.uri }}
            h={150}
            w={150}
            rounded="lg"
            resizeMode="cover"
          />
          <Button
            bg="red500"
            position='absolute'
            right={0}
            mt={5}
            h={30}
            w={30}
            p={0}
            rounded="circle"
            onPress={removeImage}
          >
            <AntDesign name="close" size={18} color="white" />
          </Button>
        </Div>
      ) : (
        <Div alignItems="center" justifyContent="center" w="100%">
          <Button
            bg={colors.secondary}
            onPress={pickImage}
            h={50}
            w={220}
            rounded="circle"
            alignSelf="center"
          >
            <Entypo name="plus" size={20} color="white" />
            <Text color="white" ml={10} fontWeight='bold'>
              {t('add-image')}
            </Text>
          </Button>
        </Div>
      )}
    </Div>
  );
};

export default Custom_image_picker