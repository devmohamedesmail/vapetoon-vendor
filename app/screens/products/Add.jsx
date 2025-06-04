import { View, Alert, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Button, Icon, Dropdown } from 'react-native-magnus'
import Custom_input from '../../custom/Custom_input'
import { useFormik } from 'formik'
import Custom_button from '../../custom/Custom_button'

import * as Yup from 'yup'
import { api } from '../../config/api'
import axios from 'axios'
import Custom_header from '../../custom/Custom_header'
import { uploadImagesToStrapi } from '../../utils/upload_images'
import Custom_images_picker from '../../custom/Custom_images_picker'
import { DataContext } from '../../context/DataProvide'





const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(0, 'Stock cannot be negative'),
  sale: Yup.number().required('Sale price is required').positive('Sale price must be positive'),
});




const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories } = useContext(DataContext)
  const dropdownRef = React.createRef();




  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      sale: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const imageIds = await uploadImagesToStrapi(images)

        const payload = {
          data: {
            ...values,
            category: Number(values.category),
            images: imageIds,
          },
        };

        console.log("Payload:", payload);

        await axios.post(`https://ecommerce-strapi-ex18.onrender.com/api/products`, payload, {
          headers: {
            Authorization: `Bearer ${api.token} `,
          },
        });

        Alert.alert('Success', 'Product added successfully!');
        formik.resetForm();
        setImages([]);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add product');
      } finally {
        setLoading(false);
      }
    },
  });


  return (


    <ScrollView >
      <Custom_header title={"Add Product"} />

      <Button
        block
        bg="pink500"
        mt="sm"
        p="md"
        color="white"
        onPress={() => dropdownRef.current.open()}>
        Open Dropdown
      </Button>

      <Dropdown
        ref={dropdownRef}
        
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">


        {categories && categories.map((category) => (
          <Dropdown.Option key={category.id} py="md" px="xl" block onPress={() => formik.setFieldValue('category', category.id)}>
            {category.title}
          </Dropdown.Option>
        ))}


      </Dropdown>

      <Div px={10} py={20}>
        <Custom_input
          placeholder={'Product Title'}
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          error={formik.errors.title}
        />


        <Custom_input
          placeholder={'Description'}
          multiline
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          error={formik.errors.description}
        />


        <Custom_input
          placeholder={'Price'}
          value={formik.values.price}
          onChangeText={formik.handleChange('price')}
          keyboardType="numeric"
          error={formik.errors.price}
        />


        <Custom_input
          placeholder={'Stock'}
          value={formik.values.stock}
          onChangeText={formik.handleChange('stock')}
          keyboardType="numeric"
          error={formik.errors.stock}
        />


        <Custom_input
          placeholder={'Sale'}
          value={formik.values.sale}
          onChangeText={formik.handleChange('sale')}
          keyboardType="numeric"
          error={formik.errors.sale}
        />



        <Custom_images_picker
          images={images}
          setImages={setImages}
          // onImagesSelected={(imgs) => console.log('Selected:', imgs)}
        />




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