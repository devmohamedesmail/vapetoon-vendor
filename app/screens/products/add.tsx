import { View, Alert, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Button, Icon, Dropdown, ScrollDiv, Image } from 'react-native-magnus'
import Custom_Input from '../../custom/custom_input'
import { useFormik } from 'formik'
import Custom_Button from '../../custom/custom_button'

import * as Yup from 'yup'
import { api } from '../../config/api'
import axios from 'axios'
import Custom_header from '../../custom/custom_header'
import { uploadImagesToStrapi } from '../../utils/upload_images'
import Custom_Images_Picker from '../../custom/custom_images_picker'
import { DataContext } from '../../context/data_provider'
import { useTranslation } from 'react-i18next'
import { colors } from '../../config/colors'
import { Toast } from 'toastify-react-native'
import { AuthContext } from '../../context/AuthProvider'
import { useRoute } from '@react-navigation/native'
import Custom_Select from '../../custom/custom_select'











const AddProduct = () => {
  const route = useRoute()
  const { vendorId }:any = route.params;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories } = useContext(DataContext)
  const dropdownRef = React.createRef();
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { auth } = useContext(AuthContext)





  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('title-required')),
    description: Yup.string().required(t('description-required')),
    price: Yup.number().required(t('price-required')).positive(t('price-positive')),
    stock: Yup.number().required(t('stock-required')).integer(t('stock-integer')).min(0, t('stock-min')),
    images: Yup.array().min(1, t('image-required')),
    category: Yup.number().required(t('category-required')),
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      sale: '',
      images: [],
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
            price: Number(values.price),
            stock: Number(values.stock),
            sale: values.sale ? Number(values.sale) : null,
            vendor: vendorId,
            vendor_id: vendorId,
            images: imageIds,
          },
        };

        console.log("Payload:", payload);

        await axios.post(`${api.baseURL}/products`, payload, {
          headers: {
            Authorization: `Bearer ${api.token} `,
          },
        });

        Toast.show({
          type: 'success',
          text1: t('product-added-successfully'),
        })
        formik.resetForm();
        setImages([]);
      } catch (error) {
        console.log(error.response?.data || error);
        Toast.show({
          type: 'error',
          text1: t('product-add-error'),
        })
      } finally {
        setLoading(false);
      }
    },
  });


  return (


    <Div flex={1} bg={colors.screenBackground}>
      <Custom_header title={"Add Product"} />



      <ScrollDiv px={10} py={20} pb={200} flex={1} >

        <Custom_Select
          options={categories}
          selectedValue={formik.values.category}
          onSelect={(value, option) => {
            formik.setFieldValue('category', value);
          }}
          placeholder={t('select-category')}
          icon="grid"
          error={formik.touched.category && formik.errors.category}
        />

        <Custom_Input
          placeholder={'Product Title'}
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          error={formik.errors.title}
        />


        <Custom_Input
          placeholder={'Description'}
          multiline
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          error={formik.errors.description}
        />


        <Custom_Input
          placeholder={'Price'}
          value={formik.values.price}
          onChangeText={formik.handleChange('price')}
          keyboardType="numeric"
          error={formik.errors.price}
        />


        <Custom_Input
          placeholder={'Stock'}
          value={formik.values.stock}
          onChangeText={formik.handleChange('stock')}
          keyboardType="numeric"
          error={formik.errors.stock}
        />


        <Custom_Input
          placeholder={'Sale'}
          value={formik.values.sale}
          onChangeText={formik.handleChange('sale')}
          keyboardType="numeric"
          error={formik.errors.sale}
        />



        <Custom_Images_Picker
          images={images}
          setImages={setImages}
        // onImagesSelected={(imgs) => console.log('Selected:', imgs)}
        />

        {typeof formik.errors.images === 'string' && (
          <Div>
            <Text style={{ color: 'red' }}>{formik.errors.images}</Text>
          </Div>
        )}





        <Custom_Button
          title={loading ? t('adding-product') : t('add-product')}
          onPress={formik.handleSubmit}
          disabled={loading}
          mt={30}
          mb={100}
        />
      </ScrollDiv>
    </Div>

  )
}

export default AddProduct