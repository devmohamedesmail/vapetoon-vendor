import React, { useState, useEffect } from 'react'
import { Div, ScrollDiv, Text, Skeleton, Image, Button } from 'react-native-magnus'
import Custom_header from '../../custom/custom_header'
import { useTranslation } from 'react-i18next'
import Product_item from '../../items/Product_item'
import axios from 'axios'
import { colors } from '../../config/colors'
import { api } from '../../config/api'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

// Add route params type
type ShowRouteParams = {
  vendorId?: string;
};

const Show = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState(null);
  const route = useRoute<RouteProp<Record<string, ShowRouteParams>, string>>();
  const vendorId = route.params?.vendorId;
  const navigation = useNavigation<any>();

  // Move fetchProducts outside useEffect
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${api.baseURL}/products?filters[vendor_id][$eq]=${vendorId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${api.token}`,
          }
        }
      );
      setProducts(res.data.data || []);
    } catch (err) {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Div flex={1}>
      <Custom_header title={t('my-products')} />
      <ScrollDiv>

        <Div pb={100}>
          <Text fontSize={20} fontWeight='bold' px={5} py={10} textAlign='center'>{t('my-products')}</Text>
          <Div px={5} flexDir='row' flexWrap='wrap' justifyContent='space-between'>
            {products === null ? (

              <Div px={10} py={20} w="100%">
                <Skeleton.Box h={30} w={200} mb={10} />
                <Skeleton.Box h={20} w={150} mb={10} />
                <Skeleton.Box h={100} w={'100%'} />
              </Div>
            ) : products.length === 0 ? (
              <Div flexDir='column' alignItems='center' justifyContent='center' w="100%">
                <Image w="50%" h={200} source={require('../../../assets/images/add-product.png')} />
                <Text textAlign='center' w="100%" bg="red100" py={30} fontWeight='bold' color='red600'>{t('no_products_found')}</Text>
                <Button onPress={() => navigation.navigate('AddProduct', { vendorId: vendorId })} bg={colors.primary} w="100%">{t('add-product')}</Button>
              </Div>
            ) : (
              products.map(product => (
                <Product_item key={product.id} product={product} fetchProducts={fetchProducts} />
              ))
            )}
          </Div>
        </Div>

      </ScrollDiv>
    </Div>
  )
}

export default Show