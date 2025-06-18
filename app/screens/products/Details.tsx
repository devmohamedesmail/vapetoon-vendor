import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Div, Text, Image, ScrollDiv, Button, Icon } from 'react-native-magnus'
import { colors } from '../../config/colors'
import { useTranslation } from 'react-i18next'
import { Dimensions } from 'react-native'
import Custom_header from '../../custom/Custom_header'

const { width } = Dimensions.get('window');

function Details() {
    const route = useRoute();
    const { product } = route.params as { product: any };
    const { t } = useTranslation();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);



    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'AED'
        }).format(price);
    };

    const hasDiscount = product.sale && product.sale < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.sale) / product.price) * 100)
        : 0;

    return (
        <Div flex={1} bg="#F8FAFC">
            <Custom_header title={t('product_details')} />

            <ScrollDiv flex={1}>
                {/* Image Gallery */}
                <Div bg="white" mb={8}>
                    <Div h={350} justifyContent="center" alignItems="center" bg="#F8FAFC">
                        {product.images && product.images.length > 0 ? (
                            <Image
                                source={{ uri: product.images[selectedImageIndex]?.url }}
                                w={width}
                                h={350}
                                resizeMode="cover"
                            />
                        ) : (
                            <Div bg="#E5E7EB" w={width} h={350} justifyContent="center" alignItems="center">
                                <Icon name="image" fontFamily="Feather" fontSize={48} color="#9CA3AF" />
                                <Text color="#9CA3AF" mt={8}>{t('no_image')}</Text>
                            </Div>
                        )}

                        {/* Discount Badge */}
                        {hasDiscount && (
                            <Div
                                position="absolute"
                                top={16}
                                right={16}
                                bg="#EF4444"
                                rounded="xl"
                                px={12}
                                py={6}
                            >
                                <Text color="white" fontSize={12} fontWeight="bold">
                                    -{discountPercentage}%
                                </Text>
                            </Div>
                        )}
                    </Div>

                    {/* Image Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <ScrollDiv horizontal showsHorizontalScrollIndicator={false} p={16}>
                            <Div flexDir="row">
                                {product.images.map((image: any, index: number) => (
                                    <Button
                                        key={image.id}
                                        bg="transparent"
                                        mr={8}
                                        onPress={() => setSelectedImageIndex(index)}
                                    >
                                        <Image
                                            source={{ uri: image.url }}
                                            w={60}
                                            h={60}
                                            rounded="xl"
                                            borderWidth={selectedImageIndex === index ? 2 : 0}
                                            borderColor={colors.secondary}
                                        />
                                    </Button>
                                ))}
                            </Div>
                        </ScrollDiv>
                    )}
                </Div>

                {/* Product Info */}
                <Div bg="white" p={20} mb={8}>
                    {/* Category */}
                    <Div
                        bg={colors.secondary}
                        rounded="xl"
                        px={12}
                        py={6}
                        alignSelf="flex-start"
                        mb={12}
                    >
                        <Text color="white" fontSize={12} fontWeight="600">
                            {product.category?.title}
                        </Text>
                    </Div>

                    {/* Title */}
                    <Text
                        fontSize={22}
                        fontWeight="bold"
                        color={colors.primary}
                        mb={12}
                        lineHeight={28}
                    >
                        {product.title}
                    </Text>

                    {/* Price Section */}
                    <Div flexDir="row" alignItems="center" mb={16}>
                        {hasDiscount ? (
                            <>
                                <Text
                                    fontSize={24}
                                    fontWeight="bold"
                                    color="#EF4444"
                                    mr={8}
                                >
                                    {formatPrice(product.sale)}
                                </Text>
                                <Text
                                    fontSize={18}
                                    color="#9CA3AF"
                                    textDecorationLine="line-through"
                                >
                                    {formatPrice(product.price)}
                                </Text>
                            </>
                        ) : (
                            <Text
                                fontSize={24}
                                fontWeight="bold"
                                color={colors.primary}
                            >
                                {formatPrice(product.price)}
                            </Text>
                        )}
                    </Div>

                    {/* Stock Status */}
                    {product.stock !== null && (
                        <Div flexDir="row" alignItems="center" mb={16}>
                            <Icon
                                name="package"
                                fontFamily="Feather"
                                fontSize={16}
                                color={product.stock > 0 ? "#10B981" : "#EF4444"}
                                mr={8}
                            />
                            <Text
                                color={product.stock > 0 ? "#10B981" : "#EF4444"}
                                fontWeight="500"
                            >
                                {product.stock > 0
                                    ? `${t('in_stock')} (${product.stock})`
                                    : t('out_of_stock')
                                }
                            </Text>
                        </Div>
                    )}

                    {/* Description */}
                    {product.description && (
                        <Div>
                            <Text
                                fontSize={16}
                                fontWeight="600"
                                color={colors.primary}
                                mb={8}
                            >
                                {t('description')}
                            </Text>
                            <Text
                                fontSize={14}
                                color="#6B7280"
                                lineHeight={22}
                            >
                                {product.description}
                            </Text>
                        </Div>
                    )}
                </Div>

                {/* Vendor Info */}
                <Div bg="white" p={20} mb={8}>
                    <Text
                        fontSize={16}
                        fontWeight="600"
                        color={colors.primary}
                        mb={12}
                    >
                        {t('vendor_info')}
                    </Text>
                    <Div flexDir="row" alignItems="center">
                        <Div
                            bg={colors.secondary}
                            rounded="circle"
                            w={48}
                            h={48}
                            justifyContent="center"
                            alignItems="center"
                            mr={12}
                        >
                            <Icon name="store" fontFamily="Feather" fontSize={20} color="white" />
                        </Div>
                        <Div flex={1}>
                            <Text fontSize={16} fontWeight="600" color={colors.primary}>
                                {product.vendor?.vendor_name}
                            </Text>
                            {product.vendor?.phone && (
                                <Text fontSize={12} color="#9CA3AF">
                                    {product.vendor.phone}
                                </Text>
                            )}
                        </Div>
                        {product.vendor?.isVarified && (
                            <Div
                                bg="#10B981"
                                rounded="circle"
                                w={24}
                                h={24}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Icon name="check" fontFamily="Feather" fontSize={12} color="white" />
                            </Div>
                        )}
                    </Div>
                </Div>

                {/* Product Status */}
                <Div bg="white" p={20} mb={20}>
                    <Text
                        fontSize={16}
                        fontWeight="600"
                        color={colors.primary}
                        mb={12}
                    >
                        {t('product_status')}
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
                        <Div
                            bg="#E0E7FF"
                            rounded="xl"
                            px={12}
                            py={6}
                            mb={8}
                        >
                            <Text color="#6366F1" fontSize={12} fontWeight="600">
                                {product.isSimple ? t('simple_product') : t('variable_product')}
                            </Text>
                        </Div>
                    </Div>
                </Div>
            </ScrollDiv>
        </Div>
    )
}

export default Details