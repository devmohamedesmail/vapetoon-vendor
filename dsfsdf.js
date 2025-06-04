import { View, Alert, Text, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Div, Button, Icon } from 'react-native-magnus'
import Custom_input from '../../custom/Custom_input'
import { useFormik } from 'formik'
import Custom_button from '../../custom/Custom_button'
import Custom_image_picker from '../../custom/Custom_image_picker'
import * as Yup from 'yup'
import { strapiAPI } from '../../config/api'
import axios from 'axios'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(0, 'Stock cannot be negative'),
  sale: Yup.number().required('Sale price is required').positive('Sale price must be positive'),
});

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddImage = (newImage) => {
    setImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      stock: '',
      sale: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // if (images.length === 0) {
      //   Alert.alert('Error', 'Please select at least one image');
      //   return;
      // }

      setLoading(true);
      try {
        
        const productResponse = await strapiAPI.post('/products', {
          data: {
            title: values.title,
            description: values.description,
            price: parseFloat(values.price),
            stock: parseInt(values.stock),
            sale: parseFloat(values.sale),
          }
        });
        

        const response = await axios.post(``)
        

        // Step 2: Upload images and link them to the product
        if (images.length > 0) {
          const formData = new FormData();

          // Append multiple images
          images.forEach((image, index) => {
            const uriParts = image.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append('files', {
              uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
              name: `image_${index + 1}.${fileType}`,
              type: `image/${fileType}`,
            });
          });

          // Add the reference to the product
          formData.append('ref', 'api::product.product');
          formData.append('refId', productResponse.data.data.id);
          formData.append('field', 'images');

          // Upload the images
          const uploadResponse = await strapiAPI.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Images uploaded:', uploadResponse.data);
        }

        Alert.alert('Success', 'Product added successfully');
        formik.resetForm();
        setImages([]);
      } catch (error) {
        console.error('Full error:', error);

        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          Alert.alert('Error', `Server error: ${error.response.status}\n${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          console.error('Request error:', error.request);
          const errorMessage = error.request._response || 'No response from server. Please check your internet connection.';
          Alert.alert('Error', errorMessage);
        } else {
          console.error('Error message:', error.message);
          Alert.alert('Error', `Request failed: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ScrollView>
      <Div p={20}>
        <Custom_input
          placeholder={'Product Title'}
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
        />
        {formik.errors.title && formik.touched.title && (
          <Div mb={10}><Text color="red">{formik.errors.title}</Text></Div>
        )}

        <Custom_input
          placeholder={'Description'}
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
        />
        {formik.errors.description && formik.touched.description && (
          <Div mb={10}><Text color="red">{formik.errors.description}</Text></Div>
        )}

        <Custom_input
          placeholder={'Price'}
          value={formik.values.price}
          onChangeText={formik.handleChange('price')}
          keyboardType="numeric"
        />
        {formik.errors.price && formik.touched.price && (
          <Div mb={10}><Text color="red">{formik.errors.price}</Text></Div>
        )}

        <Custom_input
          placeholder={'Stock'}
          value={formik.values.stock}
          onChangeText={formik.handleChange('stock')}
          keyboardType="numeric"
        />
        {formik.errors.stock && formik.touched.stock && (
          <Div mb={10}><Text color="red">{formik.errors.stock}</Text></Div>
        )}

        <Custom_input
          placeholder={'Sale'}
          value={formik.values.sale}
          onChangeText={formik.handleChange('sale')}
          keyboardType="numeric"
        />
        {formik.errors.sale && formik.touched.sale && (
          <Div mb={10}><Text color="red">{formik.errors.sale}</Text></Div>
        )}

        {/* Images Section */}
        <Div mb={20}>
          <Text mb={10} fontWeight="bold">Product Images ({images.length})</Text>
          <Div flexDir="row" flexWrap="wrap">
            {images.map((img, index) => (
              <Div key={index} m={5} position="relative">
                <Button
                  position="absolute"
                  right={5}
                  top={5}
                  zIndex={1}
                  bg="red500"
                  h={24}
                  w={24}
                  rounded="circle"
                  onPress={() => handleRemoveImage(index)}
                >
                  <Icon name="close" color="white" fontSize="sm" />
                </Button>
                <Custom_image_picker
                  image={img}
                  setImage={(newImage) => {
                    const newImages = [...images];
                    newImages[index] = newImage;
                    setImages(newImages);
                  }}
                />
              </Div>
            ))}
            {images.length < 5 && (
              <Div m={5}>
                <Custom_image_picker
                  onImageSelected={handleAddImage}
                />
              </Div>
            )}
          </Div>
          {images.length === 0 && (
            <Text color="red" mt={5}>Please add at least one image</Text>
          )}
        </Div>

        <Custom_button
          title={loading ? 'Adding Product...' : 'Add Product'}
          onPress={formik.handleSubmit}
          disabled={loading}
        />
      </Div>
    </ScrollView>
  )
}

export default AddProduct