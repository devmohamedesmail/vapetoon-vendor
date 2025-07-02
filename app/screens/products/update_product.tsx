import { View, Alert, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Div, Button, Icon, Dropdown, ScrollDiv, Image , Text } from 'react-native-magnus'
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
import { useRoute, useNavigation } from '@react-navigation/native'
import Custom_Select from '../../custom/custom_select'

const UpdateProduct = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { product }:any = route.params;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories } = useContext(DataContext)
  const dropdownRef = React.createRef();
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { auth } = useContext(AuthContext)

  // Convert existing product images to the format expected by Custom_images_picker
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      const existingImages = product.images.map(img => ({
        uri: img.url,
        id: img.id,
        isExisting: true, // Flag to identify existing images
      }));
      setImages(existingImages);
    }
  }, [product]);

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
      category: product.category?.id || '',
      title: product.title || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      stock: product.stock?.toString() || '',
      sale: product.sale?.toString() || '',
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Separate new images from existing ones
        const newImages = images.filter(img => !img.isExisting);
        const existingImages = images.filter(img => img.isExisting);

        // Upload only new images
        let newImageIds = [];
        if (newImages.length > 0) {
          newImageIds = await uploadImagesToStrapi(newImages);
        }

        // Combine existing image IDs with new ones
        const existingImageIds = existingImages.map(img => img.id);
        const allImageIds = [...existingImageIds, ...newImageIds];

        const payload = {
          data: {
            ...values,
            category: Number(values.category),
            price: Number(values.price),
            stock: Number(values.stock),
            sale: values.sale ? Number(values.sale) : null,
            vendor: product.vendor_id,
            vendor_id: product.vendor_id,
            images: allImageIds,
          },
        };

        

        await axios.put(`${api.baseURL}/products/${product.documentId}`, payload, {
          headers: {
            Authorization: `Bearer ${api.token}`,
          },
        });

        Toast.show({
          type: 'success',
          text1: t('product-updated-successfully'),
        });

        // Navigate back to products list or details
        navigation.goBack();
        
      } catch (error) {
        console.log(error.response?.data || error);
        Toast.show({
          type: 'error',
          text1: t('product-update-error'),
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // Update formik when images change
  useEffect(() => {
    formik.setFieldValue('images', images);
  }, [images]);

  const handleDeleteProduct = () => {
    Alert.alert(
      t('delete_product'),
      t('are_you_sure_delete'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`${api.baseURL}/products/${product.documentId}`, {
                headers: {
                  Authorization: `Bearer ${api.token}`,
                }
              });

              Toast.show({
                text1: t('product_deleted_successfully'),
                type: 'success',
                
              });

              navigation.navigate('Show' as never); // Navigate to products list
              
            } catch (error) {
              Alert.alert(t('error'), t('delete_failed'));
              console.log('Delete product error:', error);
              Toast.show({
                text1: t('product_deleted_failed'),
                type: 'error',
                
              });
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <Div flex={1} bg={colors.screenBackground}>
      <Custom_header title={t('update_product')} />

      <ScrollDiv px={10} py={20} pb={200} flex={1}>
        {/* Product Status Info */}
        <Div bg="white" p={16} rounded="xl" mb={16}>
          <Text fontSize={16} fontWeight="600" color={colors.primary} mb={8}>
            {t('product_info')}
          </Text>
          <Div flexDir="row" flexWrap="wrap">
            <Div
              bg={product.isActive ? "#DCFCE7" : "#FEE2E2"}
              rounded="xl"
              px={12}
              py={6}
              mr={8}
              mb={8}
            >
              <Text
                color={product.isActive ? "#10B981" : "#EF4444"}
                fontSize={12}
                fontWeight="600"
              >
                {product.isActive ? t('active') : t('inactive')}
              </Text>
            </Div>
            {product.isFeatured && (
              <Div
                bg="#FEF3C7"
                rounded="xl"
                px={12}
                py={6}
                mr={8}
                mb={8}
              >
                <Text color="#F59E0B" fontSize={12} fontWeight="600">
                  {t('featured')}
                </Text>
              </Div>
            )}
          </Div>
        </Div>

        <Custom_Select
          options={categories}
          selectedValue={formik.values.category}
          onSelect={(value, option) => {
            formik.setFieldValue('category', value);
          }}
          placeholder={t('select-category')}
          icon="grid"
          error={typeof formik.errors.category === 'string' && formik.touched.category ? formik.errors.category : undefined}
        />

        <Custom_Input
          placeholder={t('product_title')}
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          error={typeof formik.errors.title === 'string' && formik.touched.title ? formik.errors.title : undefined}
        />

        <Custom_Input
          placeholder={t('description')}
          multiline
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          error={typeof formik.errors.description === 'string' && formik.touched.description ? formik.errors.description : undefined}
        />

        <Custom_Input
          placeholder={t('price')}
          value={formik.values.price}
          onChangeText={formik.handleChange('price')}
          keyboardType="numeric"
          error={typeof formik.errors.price === 'string' && formik.touched.price ? formik.errors.price : undefined}
        />

        <Custom_Input
          placeholder={t('stock')}
          value={formik.values.stock}
          onChangeText={formik.handleChange('stock')}
          keyboardType="numeric"
          error={typeof formik.errors.stock === 'string' && formik.touched.stock ? formik.errors.stock : undefined}
        />

        <Custom_Input
          placeholder={t('sale')}
          value={formik.values.sale}
          onChangeText={formik.handleChange('sale')}
          keyboardType="numeric"
          error={typeof formik.errors.sale === 'string' && formik.touched.sale ? formik.errors.sale : undefined}
        />

        <Custom_Images_Picker
          images={images}
          setImages={setImages}
        />

        {typeof formik.errors.images === 'string' && (
          <Div>
            <Text style={{ color: 'red' }}>{formik.errors.images}</Text>
          </Div>
        )}

        {/* Action Buttons */}
        <Div flexDir="row" mt={30} mb={100}>
          <Custom_Button
            title={loading ? t('updating_product') : t('update_product')}
            onPress={formik.handleSubmit}
            disabled={loading}
            variant="primary"
            size="medium"
            style={{ flex: 1, marginRight: 8 }}
          />
          
          <Custom_Button
            title={t('delete_product')}
            onPress={handleDeleteProduct}
            disabled={loading}
            variant="outline"
            size="medium"
            style={{ 
              flex: 0.4,
              borderColor: '#EF4444',
              backgroundColor: '#FEE2E2'
            }}
          />
        </Div>
      </ScrollDiv>
    </Div>
  )
}

export default UpdateProduct
