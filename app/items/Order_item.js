
import React from 'react'
import { Div, Text, Button } from 'react-native-magnus';
import { colors } from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

// Icons
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Order_item = ({ order }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    // Status color mapping
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return { 
                    bg: '#10B981', 
                    icon: 'check-circle', 
                    lightBg: '#ECFDF5',
                    borderColor: '#A7F3D0'
                };
            case 'pending':
                return { 
                    bg: '#F59E0B', 
                    icon: 'clock', 
                    lightBg: '#FFFBEB',
                    borderColor: '#FDE68A'
                };
            case 'processing':
                return { 
                    bg: '#3B82F6', 
                    icon: 'truck', 
                    lightBg: '#EFF6FF',
                    borderColor: '#BFDBFE'
                };
            case 'cancelled':
            case 'canceled':
                return { 
                    bg: '#EF4444', 
                    icon: 'x-circle', 
                    lightBg: '#FEF2F2',
                    borderColor: '#FECACA'
                };
            default:
                return { 
                    bg: '#6B7280', 
                    icon: 'help-circle', 
                    lightBg: '#F9FAFB',
                    borderColor: '#E5E7EB'
                };
        }
    }

    const statusStyle = getStatusStyle(order.order_status);
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    const orderTime = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Pressable onPress={() => navigation.navigate('OrderDetails', { order: order })}>
            <Div 
                bg="white" 
                rounded="2xl" 
                shadow="lg" 
                mb={16} 
                mx={2}
                overflow="hidden"
                borderWidth={1}
                borderColor={statusStyle.borderColor}
            >
                {/* Header with gradient-like background */}
                <Div 
                    bg={colors.primary}
                    p={16}
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                    }}
                >
                    <Div flexDir="row" alignItems="center" justifyContent="space-between">
                        <Div flexDir="row" alignItems="center">
                            <Div 
                                bg="white" 
                                rounded="xl" 
                                w={52} 
                                h={52} 
                                alignItems="center" 
                                justifyContent="center"
                                mr={12}
                                shadow="sm"
                            >
                                <Text fontSize={14} fontWeight="bold" color={colors.primary}>
                                    #{order.id}
                                </Text>
                            </Div>
                            <Div>
                                <Text color="white" fontSize={18} fontWeight="bold">
                                    {t('order-details')}
                                </Text>
                                <Div flexDir="row" alignItems="center" mt={2}>
                                    <Feather name="calendar" size={12} color="rgba(255,255,255,0.8)" />
                                    <Text color="white" fontSize={12} opacity={0.9} ml={4}>
                                        {orderDate} • {orderTime}
                                    </Text>
                                </Div>
                            </Div>
                        </Div>
                        
                        <Div 
                            bg="rgba(255,255,255,0.2)" 
                            rounded="full" 
                            w={32} 
                            h={32} 
                            alignItems="center" 
                            justifyContent="center"
                        >
                            <AntDesign name="right" size={16} color="white" />
                        </Div>
                    </Div>
                </Div>

                {/* Content */}
                <Div p={16}>
                    {/* Customer Info */}
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <Div 
                            bg="rgba(59, 130, 246, 0.1)" 
                            rounded="xl" 
                            w={44} 
                            h={44} 
                            alignItems="center" 
                            justifyContent="center"
                            mr={12}
                        >
                            <FontAwesome5 name="user" size={18} color="#3B82F6" />
                        </Div>
                        <Div flex={1}>
                            <Text fontSize={16} fontWeight="bold" color="#1F2937" mb={2}>
                                {order.name}
                            </Text>
                            <Div flexDir="row" alignItems="center">
                                <Feather name="phone" size={14} color="#6B7280" />
                                <Text fontSize={14} color="#6B7280" ml={6}>
                                    {order.phone}
                                </Text>
                            </Div>
                        </Div>
                    </Div>

                    {/* Address */}
                    <Div flexDir="row" alignItems="flex-start" mb={16}>
                        <Div 
                            bg="rgba(16, 185, 129, 0.1)" 
                            rounded="xl" 
                            w={44} 
                            h={44} 
                            alignItems="center" 
                            justifyContent="center"
                            mr={12}
                        >
                            <MaterialIcons name="location-on" size={18} color="#10B981" />
                        </Div>
                        <Div flex={1}>
                            <Text fontSize={14} color="#6B7280" lineHeight={22}>
                                {order.address}
                            </Text>
                        </Div>
                    </Div>

                    {/* Status and Actions */}
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={16}>
                        <Div 
                            bg={statusStyle.lightBg} 
                            rounded="full" 
                            px={16} 
                            py={10}
                            flexDir="row"
                            alignItems="center"
                            borderWidth={1}
                            borderColor={statusStyle.borderColor}
                        >
                            <Feather name={statusStyle.icon} size={16} color={statusStyle.bg} />
                            <Text 
                                fontSize={14} 
                                fontWeight="600" 
                                color={statusStyle.bg}
                                ml={8}
                                textTransform="capitalize"
                            >
                                {order.order_status}
                            </Text>
                        </Div>

                        <Button 
                            bg={colors.primary}
                            rounded="xl"
                            px={20}
                            py={12}
                            flexDir="row"
                            alignItems="center"
                            onPress={() => navigation.navigate('OrderDetails', { order: order })}
                            shadow="md"
                        >
                            <Entypo name="eye" size={16} color="white" />
                            <Text color="white" fontSize={14} fontWeight="600" ml={8}>
                                View Details
                            </Text>
                        </Button>
                    </Div>

                    {/* Order Stats */}
                    {order.total && (
                        <Div 
                            pt={16} 
                            borderTopWidth={1} 
                            borderTopColor="#E5E7EB"
                            flexDir="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Div flexDir="row" alignItems="center">
                                <MaterialIcons name="receipt" size={18} color="#6B7280" />
                                <Text fontSize={15} color="#6B7280" ml={8} fontWeight="500">
                                    {t('total')}
                                </Text>
                            </Div>
                            <Text fontSize={18} fontWeight="bold" color="#10B981">
                                ${order.total}
                            </Text>
                        </Div>
                    )}

                    {/* Payment Method if available */}
                    {order.payment_method && (
                        <Div 
                            mt={12}
                            flexDir="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Div flexDir="row" alignItems="center">
                                <MaterialIcons name="payment" size={18} color="#6B7280" />
                                <Text fontSize={15} color="#6B7280" ml={8} fontWeight="500">
                                    {t('payment-method')}
                                </Text>
                            </Div>
                            <Text fontSize={14} fontWeight="600" color="#374151" textTransform="capitalize">
                                {order.payment_method}
                            </Text>
                        </Div>
                    )}
                </Div>
            </Div>
        </Pressable>
    )
}

export default Order_item