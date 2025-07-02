import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Div, Text, Image, ScrollDiv, Button, Icon } from 'react-native-magnus'
import { colors } from '../../config/colors'
import { useTranslation } from 'react-i18next'
import { Dimensions, Pressable } from 'react-native'
import Custom_header from '../../custom/custom_header'

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window');

function Details() {
    const route = useRoute();
    const { product } = route.params as { product: any };
    const { t } = useTranslation();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const hasDiscount = product.sale && product.sale > 0 && product.sale < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.sale) / product.price) * 100)
        : 0;

    return (
        <Div flex={1} bg="#F1F5F9">
            <Custom_header title={t('product_details')} />

            <ScrollDiv flex={1} showsVerticalScrollIndicator={false}>
                {/* Hero Image Section */}
                <Div bg="white" mb={6} shadow="sm">
                    <Div position="relative">
                        <Div h={380} justifyContent="center" alignItems="center" bg="white">
                            {product.images && product.images.length > 0 ? (
                                <Image
                                    source={{ uri: product.images[selectedImageIndex]?.url }}
                                    w={width}
                                    h={380}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Div 
                                    bg="gray100" 
                                    w={width} 
                                    h={380} 
                                    justifyContent="center" 
                                    alignItems="center"
                                >
                                    <MaterialIcons name="image" size={64} color="#9CA3AF" />
                                    <Text color="#9CA3AF" mt={12} fontSize={16}>{t('no_image')}</Text>
                                </Div>
                            )}
                        </Div>

                        {/* Floating Badges */}
                        <Div position="absolute" top={20} left={20} right={20} flexDir="row" justifyContent="space-between">
                            {/* Discount Badge */}
                            {hasDiscount && (
                                <Div
                                    bg="#FF4757"
                                    rounded="2xl"
                                    px={16}
                                    py={8}
                                    flexDir="row"
                                    alignItems="center"
                                    shadow="lg"
                                >
                                    <MaterialIcons name="local-offer" size={16} color="white" />
                                    <Text color="white" fontSize={14} fontWeight="bold" ml={4}>
                                        {discountPercentage}% OFF
                                    </Text>
                                </Div>
                            )}

                            {/* Stock Status Badge */}
                            <Div
                                bg={product.stock > 0 ? "#2ECC71" : "#E74C3C"}
                                rounded="2xl"
                                px={16}
                                py={8}
                                flexDir="row"
                                alignItems="center"
                                shadow="lg"
                            >
                                <MaterialIcons 
                                    name={product.stock > 0 ? "inventory" : "inventory-2"} 
                                    size={16} 
                                    color="white" 
                                />
                                <Text color="white" fontSize={14} fontWeight="bold" ml={4}>
                                    {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                                </Text>
                            </Div>
                        </Div>

                        {/* Image Counter */}
                        {product.images && product.images.length > 1 && (
                            <Div 
                                position="absolute" 
                                bottom={20} 
                                right={20}
                                bg="rgba(0,0,0,0.7)"
                                rounded="2xl"
                                px={12}
                                py={6}
                            >
                                <Text color="white" fontSize={12} fontWeight="600">
                                    {selectedImageIndex + 1} / {product.images.length}
                                </Text>
                            </Div>
                        )}
                    </Div>

                    {/* Image Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <Div p={16} bg="white">
                            <ScrollDiv horizontal showsHorizontalScrollIndicator={false}>
                                <Div flexDir="row">
                                    {product.images.map((image: any, index: number) => (
                                        <Pressable
                                            key={image.id}
                                            onPress={() => setSelectedImageIndex(index)}
                                        >
                                            <Div
                                                mr={12}
                                                rounded="xl"
                                                overflow="hidden"
                                                borderWidth={selectedImageIndex === index ? 3 : 1}
                                                borderColor={selectedImageIndex === index ? colors.primary : "#E5E7EB"}
                                                shadow={selectedImageIndex === index ? "md" : "sm"}
                                            >
                                                <Image
                                                    source={{ uri: image.url }}
                                                    w={70}
                                                    h={70}
                                                    resizeMode="cover"
                                                />
                                            </Div>
                                        </Pressable>
                                    ))}
                                </Div>
                            </ScrollDiv>
                        </Div>
                    )}
                </Div>

                {/* Product Information Card */}
                <Div bg="white" mb={6} mx={16} rounded="3xl" p={24} >
                    {/* Category Tag */}
                    <Div alignSelf="flex-start" mb={16}>
                        <Div
                            bg="rgba(99, 102, 241, 0.1)"
                            rounded="full"
                            px={16}
                            py={8}
                            flexDir="row"
                            alignItems="center"
                        >
                            <MaterialIcons name="category" size={16} color="#6366F1" />
                            <Text color="#6366F1" fontSize={13} fontWeight="600" ml={6}>
                                {product.category?.title || 'Uncategorized'}
                            </Text>
                        </Div>
                    </Div>

                    {/* Product Title */}
                    <Text
                        fontSize={26}
                        fontWeight="bold"
                        color="#1F2937"
                        mb={16}
                        lineHeight={32}
                    >
                        {product.title}
                    </Text>

                    {/* Price Section */}
                    <Div flexDir="row" alignItems="center" mb={20}>
                        {hasDiscount ? (
                            <Div flexDir="row" alignItems="center">
                                <Text
                                    fontSize={28}
                                    fontWeight="bold"
                                    color="#E74C3C"
                                    mr={12}
                                >
                                    {formatPrice(product.sale)}
                                </Text>
                                <Text
                                    fontSize={20}
                                    color="#9CA3AF"
                                    textDecorationLine="line-through"
                                    fontWeight="500"
                                >
                                    {formatPrice(product.price)}
                                </Text>
                            </Div>
                        ) : (
                            <Text
                                fontSize={28}
                                fontWeight="bold"
                                color={colors.primary}
                            >
                                {formatPrice(product.price)}
                            </Text>
                        )}
                    </Div>

                    {/* Product Stats */}
                    <Div flexDir="row" justifyContent="space-between" mb={20}>
                        <Div alignItems="center" flex={1}>
                            <Div
                                bg="rgba(34, 197, 94, 0.1)"
                                rounded="full"
                                w={48}
                                h={48}
                                justifyContent="center"
                                alignItems="center"
                                mb={8}
                            >
                                <MaterialIcons name="inventory" size={24} color="#22C55E" />
                            </Div>
                            <Text fontSize={16} fontWeight="bold" color="#1F2937">
                                {product.stock || 0}
                            </Text>
                            <Text fontSize={12} color="#6B7280">Stock</Text>
                        </Div>

                        <Div alignItems="center" flex={1}>
                            <Div
                                bg="rgba(245, 158, 11, 0.1)"
                                rounded="full"
                                w={48}
                                h={48}
                                justifyContent="center"
                                alignItems="center"
                                mb={8}
                            >
                                <AntDesign name="star" size={24} color="#F59E0B" />
                            </Div>
                            <Text fontSize={16} fontWeight="bold" color="#1F2937">
                                {product.isFeatured ? 'Yes' : 'No'}
                            </Text>
                            <Text fontSize={12} color="#6B7280">Featured</Text>
                        </Div>

                        <Div alignItems="center" flex={1}>
                            <Div
                                bg="rgba(139, 69, 19, 0.1)"
                                rounded="full"
                                w={48}
                                h={48}
                                justifyContent="center"
                                alignItems="center"
                                mb={8}
                            >
                                <MaterialCommunityIcons name="shape" size={24} color="#8B4513" />
                            </Div>
                            <Text fontSize={16} fontWeight="bold" color="#1F2937">
                                {product.isSimple ? 'Simple' : 'Variable'}
                            </Text>
                            <Text fontSize={12} color="#6B7280">Type</Text>
                        </Div>
                    </Div>

                    {/* Description */}
                    {product.description && (
                        <Div>
                            <Div flexDir="row" alignItems="center" mb={12}>
                                <MaterialIcons name="description" size={20} color={colors.primary} />
                                <Text
                                    fontSize={18}
                                    fontWeight="bold"
                                    color={colors.primary}
                                    ml={8}
                                >
                                    {t('description')}
                                </Text>
                            </Div>
                            <Text
                                fontSize={15}
                                color="#4B5563"
                                lineHeight={24}
                                bg="#F9FAFB"
                                p={16}
                                rounded="xl"
                            >
                                {product.description}
                            </Text>
                        </Div>
                    )}
                </Div>

                {/* Vendor Information Card */}
                <Div bg="white" mb={6} mx={16} rounded="3xl" p={24} >
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialIcons name="store" size={24} color={colors.primary} />
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color={colors.primary}
                            ml={8}
                        >
                            {t('vendor_info')}
                        </Text>
                    </Div>

                    <Div flexDir="row" alignItems="center">
                        <Div
                            bg={colors.secondary}
                            rounded="2xl"
                            w={64}
                            h={64}
                            justifyContent="center"
                            alignItems="center"
                            mr={16}
                            shadow="md"
                        >
                            {product.vendor?.logo ? (
                                <Image
                                    source={{ uri: product.vendor.logo }}
                                    w={64}
                                    h={64}
                                    rounded="2xl"
                                />
                            ) : (
                                <FontAwesome5 name="store" size={24} color="white" />
                            )}
                        </Div>
                        
                        <Div flex={1}>
                            <Div flexDir="row" alignItems="center" mb={8}>
                                <Text fontSize={18} fontWeight="bold" color="#1F2937">
                                    {product.vendor?.vendor_name || 'Unknown Vendor'}
                                </Text>
                                {product.vendor?.isVarified && (
                                    <Div
                                        bg="#22C55E"
                                        rounded="full"
                                        w={24}
                                        h={24}
                                        justifyContent="center"
                                        alignItems="center"
                                        ml={8}
                                    >
                                        <AntDesign name="check" size={12} color="white" />
                                    </Div>
                                )}
                            </Div>
                            
                            {product.vendor?.phone && (
                                <Div flexDir="row" alignItems="center" mb={4}>
                                    <Feather name="phone" size={14} color="#6B7280" />
                                    <Text fontSize={14} color="#6B7280" ml={6}>
                                        {product.vendor.phone}
                                    </Text>
                                </Div>
                            )}

                            {product.vendor?.description && (
                                <Div flexDir="row" alignItems="flex-start">
                                    <MaterialIcons name="info" size={14} color="#6B7280" />
                                    <Text fontSize={14} color="#6B7280" ml={6} flex={1}>
                                        {product.vendor.description}
                                    </Text>
                                </Div>
                            )}
                        </Div>
                    </Div>
                </Div>

                {/* Status & Features Card */}
                <Div bg="white" mb={6} mx={16} rounded="3xl" p={24} >
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialIcons name="tune" size={24} color={colors.primary} />
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color={colors.primary}
                            ml={8}
                        >
                            {t('product_status')}
                        </Text>
                    </Div>

                    <Div flexDir="row" flexWrap="wrap">
                        {/* Active Status */}
                        <Div
                            bg={product.isActive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                            rounded="2xl"
                            px={16}
                            py={10}
                            mr={12}
                            mb={12}
                            flexDir="row"
                            alignItems="center"
                            borderWidth={1}
                            borderColor={product.isActive ? "#22C55E" : "#EF4444"}
                        >
                            <MaterialIcons 
                                name={product.isActive ? "check-circle" : "cancel"} 
                                size={18} 
                                color={product.isActive ? "#22C55E" : "#EF4444"} 
                            />
                            <Text
                                color={product.isActive ? "#22C55E" : "#EF4444"}
                                fontSize={14}
                                fontWeight="bold"
                                ml={6}
                            >
                                {product.isActive ? t('active') : t('inactive')}
                            </Text>
                        </Div>

                        {/* Featured Badge */}
                        {product.isFeatured && (
                            <Div
                                bg="rgba(245, 158, 11, 0.1)"
                                rounded="2xl"
                                px={16}
                                py={10}
                                mr={12}
                                mb={12}
                                flexDir="row"
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#F59E0B"
                            >
                                <AntDesign name="star" size={18} color="#F59E0B" />
                                <Text color="#F59E0B" fontSize={14} fontWeight="bold" ml={6}>
                                    {t('featured')}
                                </Text>
                            </Div>
                        )}

                        {/* Product Type */}
                        <Div
                            bg="rgba(99, 102, 241, 0.1)"
                            rounded="2xl"
                            px={16}
                            py={10}
                            mb={12}
                            flexDir="row"
                            alignItems="center"
                            borderWidth={1}
                            borderColor="#6366F1"
                        >
                            <MaterialCommunityIcons 
                                name={product.isSimple ? "cube" : "cube-outline"} 
                                size={18} 
                                color="#6366F1" 
                            />
                            <Text color="#6366F1" fontSize={14} fontWeight="bold" ml={6}>
                                {product.isSimple ? t('simple_product') : t('variable_product')}
                            </Text>
                        </Div>
                    </Div>
                </Div>

                {/* Bottom Spacing */}
                <Div h={20} />
            </ScrollDiv>
        </Div>
    )
}

export default Details