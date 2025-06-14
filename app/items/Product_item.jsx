import React from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../config/colors";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";
import { Alert } from "react-native";
import axios from "axios";
import { api } from "../config/api";
import Swiper from 'react-native-swiper'
import Entypo from '@expo/vector-icons/Entypo';



const Product_item = ({ product, fetchProducts }) => {
    const { t } = useTranslation();








    const handleDelete = () => {
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
                            await axios.delete(`${api.baseURL}/products/${product.documentId}`, {
                                headers: {
                                    Authorization: `Bearer ${api.token}`,
                                }
                            });

                            await fetchProducts();
                            Toast.show({
                                text1: t('product_deleted_successfully'),
                                type: 'success',
                                duration: 3000,
                            })

                        } catch (error) {
                            Alert.alert(t('error'), t('delete_failed'));
                            console.log('Delete product error:', error);
                            Toast.show({
                                text1: t('product_deleted_failed'),
                                type: 'error',
                                duration: 3000,
                            })
                        }
                    }
                }
            ]
        );
    }











    return (
        <Div w="49%" mb={10} bg="white" rounded="md"  >

            <Swiper
                autoplay={true}
                showsButtons={true}
                height={150}
                nextButton={<AntDesign name="right" size={20} color={colors.secondary} />}
                prevButton={<AntDesign name="left" size={20} color={colors.secondary} />}
                dot={<Entypo name="dot-single" size={24} color="black" />}
                activeDot={<Entypo name="dot-single" size={24} color={colors.secondary} />}
                >
                {product.images && product.images.length > 0 ? (
                    product.images.map((img, idx) => (
                        <Image
                            key={img.id || idx}
                            h={150}
                            w="100%"
                            resizeMode="cover"
                            source={{
                                uri: img.formats?.thumbnail?.url || img.url || 'https://via.placeholder.com/150',
                            }}
                        />
                    ))
                ) : (
                    <Image
                        h={150}
                        w="100%"
                        resizeMode="cover"
                        source={{ uri: 'https://via.placeholder.com/150' }}
                    />
                )}
            </Swiper>

            <Div px={10} py={5}>
                <Text>{product.title}</Text>

                <Div flexDir="row" justifyContent="space-between" mt={5} >
                    <Text>{t('price')} : {product.price}</Text>
                    <Text>{t('sale')} :{product.sale ? product.sale : 'N/A'}</Text>
                </Div>
                <Text>{t('stock')} : {product.stock}</Text>

            </Div>
            <Div flexDir="row" justifyContent="space-between" mt={10} px={10} pb={10}>
                <Button
                    onPress={() => handleDelete()}
                    bg="red600"><AntDesign name="delete" size={17} color="white" /></Button>
                {/* <Button bg={colors.primary}><AntDesign name="edit" size={17} color="white" /></Button>
                <Button bg={colors.primary}><AntDesign name="eyeo" size={17} color="white" /></Button> */}
            </Div>

        </Div>
    )
}

export default Product_item