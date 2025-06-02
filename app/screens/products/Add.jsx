import { View, Text } from 'react-native'
import React from 'react'
import { Div } from 'react-native-magnus'
import Custom_input from '../../custom/Custom_input'
import { useFormik } from 'formik'
import Custom_button from '../../custom/Custom_button';

const AddProduct = () => {

    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
          price: '',
          stock: '',
          sale: '',
          images:'',
        },
        onSubmit: values => {
          console.log(values)
        },
      });
  return (
    <Div p={20}>

        <Custom_input
         placeholder={'Product Title'} 
         value={formik.values.title} onChangeText={formik.handleChange('title')} />
        <Custom_input
        placeholder={'Description'}
        value={formik.values.description} onChangeText={formik.handleChange('description')} />
        <Custom_input
        placeholder={'Price'}
        value={formik.values.price} onChangeText={formik.handleChange('price')} />
        <Custom_input
        placeholder={'Stock'}
        value={formik.values.stock} onChangeText={formik.handleChange('stock')} />
        <Custom_input
        placeholder={'Sale'}
        value={formik.values.sale} onChangeText={formik.handleChange('sale')} />

        <Custom_button title={'Add Product'} onPress={formik.handleSubmit} />
       
    </Div>
  )
}

export default AddProduct