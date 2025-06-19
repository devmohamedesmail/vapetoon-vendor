import React from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { colors } from "../config/colors";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";
import { Alert } from "react-native";
import axios from "axios";
import { api } from "../config/api";
import Swiper from 'react-native-swiper'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

const Product_item = ({ product, fetchProducts }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'AED'
        }).format(price);
    };

    const hasDiscount = product.sale && product.sale < product.price;
    const discountPercentage = hasDiscount 
        ? Math.round(((product.price - product.sale) / product.price) * 100)
        : 0;

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
        <Div w="49%" mb={16} bg="white" rounded="2xl" shadow="sm" overflow="hidden">
            {/* Image Section with Swiper */}
            <Div position="relative">
                <Swiper
                    autoplay={false}
                    showsButtons={false}
                    height={180}
                    dotStyle={{ backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6 }}
                    activeDotStyle={{ backgroundColor: colors.secondary, width: 8, height: 8 }}
                    paginationStyle={{ bottom: 8 }}
                >
                    {product.images && product.images.length > 0 ? (
                        product.images.map((img, idx) => (
                            <Image
                                key={img.id || idx}
                                h={180}
                                w="100%"
                                resizeMode="cover"
                                source={{
                                    uri: img.formats?.thumbnail?.url || img.url || 'https://via.placeholder.com/180',
                                }}
                            />
                        ))
                    ) : (
                        <Div h={180} w="100%" bg="#F3F4F6" justifyContent="center" alignItems="center">
                            <Feather name="image" size={32} color="#9CA3AF" />
                        </Div>
                    )}
                </Swiper>

                {/* Discount Badge */}
                {hasDiscount && (
                    <Div
                        position="absolute"
                        top={8}
                        right={8}
                        bg="#EF4444"
                        rounded="lg"
                        px={8}
                        py={4}
                    >
                        <Text color="white" fontSize={10} fontWeight="bold">
                            -{discountPercentage}%
                        </Text>
                    </Div>
                )}

                {/* Status Badge */}
                <Div
                    position="absolute"
                    top={8}
                    left={8}
                    bg={product.isActive ? "#10B981" : "#EF4444"}
                    rounded="lg"
                    px={8}
                    py={4}
                >
                    <Text color="white" fontSize={10} fontWeight="bold">
                        {product.isActive ? t('active') : t('inactive')}
                    </Text>
                </Div>
            </Div>

            {/* Content Section */}
            <Div p={12}>
                {/* Category */}
                {product.category && (
                    <Div
                        bg="#F3F4F6"
                        rounded="lg"
                        px={8}
                        py={4}
                        alignSelf="flex-start"
                        mb={8}
                    >
                        <Text color={colors.secondary} fontSize={10} fontWeight="600">
                            {product.category.title}
                        </Text>
                    </Div>
                )}

                {/* Title */}
                <Text 
                    fontSize={14} 
                    fontWeight="600" 
                    color={colors.primary} 
                    numberOfLines={2}
                    mb={8}
                    lineHeight={18}
                >
                    {product.title}
                </Text>

                {/* Price Section */}
                <Div mb={8}>
                    {hasDiscount ? (
                        <Div>
                            <Text fontSize={16} fontWeight="bold" color="#EF4444">
                                {formatPrice(product.sale)}
                            </Text>
                            <Text 
                                fontSize={12} 
                                color="#9CA3AF" 
                                textDecorationLine="line-through"
                            >
                                {formatPrice(product.price)}
                            </Text>
                        </Div>
                    ) : (
                        <Text fontSize={16} fontWeight="bold" color={colors.primary}>
                            {formatPrice(product.price)}
                        </Text>
                    )}
                </Div>

                {/* Stock Info */}
                <Div flexDir="row" alignItems="center" mb={12}>
                    <Feather 
                        name="package" 
                        size={12} 
                        color={product.stock > 0 ? "#10B981" : "#EF4444"} 
                    />
                    <Text 
                        fontSize={11} 
                        color={product.stock > 0 ? "#10B981" : "#EF4444"}
                        ml={4}
                        fontWeight="500"
                    >
                        {product.stock > 0 ? `${t('stock')}: ${product.stock}` : t('out_of_stock')}
                    </Text>
                </Div>

                {/* Action Buttons */}
                <Div flexDir="row" justifyContent="space-between">
                    <Button
                        bg="#FEE2E2"
                        rounded="lg"
                        px={8}
                        py={8}
                        mr={4}
                        flex={1}
                        onPress={handleDelete}
                    >
                        <Feather name="trash-2" size={14} color="#EF4444" />
                    </Button>
                    
                    <Button
                        bg="#F0F9FF"
                        rounded="lg"
                        px={8}
                        py={8}
                        mr={4}
                        flex={1}
                        onPress={() => navigation.navigate('UpdateProduct', { product: product })}
                    >
                        <Feather name="edit-3" size={14} color="#0EA5E9" />
                    </Button>
                    
                    <Button 
                        bg={colors.secondary}
                        rounded="lg"
                        px={8}
                        py={8}
                        flex={1}
                        onPress={() => navigation.navigate('Details', { product: product })}
                    >
                        <Feather name="eye" size={14} color="white" />
                    </Button> 
                </Div>
            </Div>
        </Div>
    )
}

export default Product_item