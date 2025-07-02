
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, Div, ScrollDiv, Text } from 'react-native-magnus';
import Custom_header from '../../custom/custom_header';
import { useTranslation } from 'react-i18next';
import { colors } from '../../config/colors';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { api } from '../../config/api';
import Order_item from '../../items/Order_item';
import Button_tab from '../../items/Button_tab';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Skeleton_loading_item from '../../items/Skeleton_loading_item';






const Orders = () => {
    const [orders, setOrders] = useState(null)
    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [processingOrders, setProcessingOrders] = useState([]);
    const [canceledOrders, setCanceledOrders] = useState([]);
    const route = useRoute();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('completed');
    const { vendorId }:any = route.params || 22;
    const [loading, setLoading] = useState(false);



    const orderTabs = [
        { key: 'completed', label: t('completed-orders') , icon: <AntDesign name="check" size={24} color="white" />},
        { key: 'pending', label: t('pending-orders') , icon: <Entypo name="stopwatch" size={24} color="white" /> },
        { key: 'processing', label: t('processing-orders') ,icon: <MaterialIcons name="local-shipping" size={24} color="white" /> },
        { key: 'canceled', label: t('canceled-orders') , icon:<AntDesign name="close" size={24} color="white" /> },
    ];





    const fetch_vendor_orders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${api.baseURL}/orders?filters[vendor_id][$eq]=${vendorId}`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                }
            });
            const data = response.data.data;
            setCompletedOrders(data.filter(order => order.order_status === 'completed'));
            setPendingOrders(data.filter(order => order.order_status === 'pending'));
            setProcessingOrders(data.filter(order => order.order_status === 'processing'));
            setCanceledOrders(data.filter(order => order.order_status === 'cancelled'));
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching vendor orders:", error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        fetch_vendor_orders()
    }, [])






    return (
        <Div flex={1} bg="#F8FAFC">
            <Custom_header title={t('my-orders')} />
            
            {/* Tab Section */}
            <Div px={16} mt={12} mb={8}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {orderTabs.map((tab, index) => (
                        <Button_tab
                            key={tab.key}
                            icon={tab.icon}
                            bg={activeTab === tab.key ? colors.primary : colors.secondary}
                            onPress={() => setActiveTab(tab.key)}
                            color={activeTab === tab.key ? 'white' : 'white'}
                            title={tab.label}
                            // mr={index < orderTabs.length - 1 ? 8 : 0}
                        />
                    ))}
                </ScrollView>
            </Div>

            {/* Orders List */}
            <ScrollDiv flex={1} px={8}>
                {loading ? (
                    <Skeleton_loading_item />
                ) : (
                    <Div py={8}>
                        {activeTab === 'completed' && completedOrders.length > 0 ? (
                            completedOrders.map(order => (
                                <Order_item key={order.id} order={order} />
                            ))
                        ) : activeTab === 'pending' && pendingOrders.length > 0 ? (
                            pendingOrders.map(order => (
                                <Order_item key={order.id} order={order} />
                            ))
                        ) : activeTab === 'processing' && processingOrders.length > 0 ? (
                            processingOrders.map(order => (
                                <Order_item key={order.id} order={order} />
                            ))
                        ) : activeTab === 'canceled' && canceledOrders.length > 0 ? (
                            canceledOrders.map(order => (
                                <Order_item key={order.id} order={order} />
                            ))
                        ) : (
                            <Div 
                                alignItems="center" 
                                justifyContent="center" 
                                py={40}
                                bg="white"
                                rounded="2xl"
                                mx={8}
                                shadow="sm"
                            >
                                <AntDesign name="inbox" size={48} color="#9CA3AF" />
                                <Text 
                                    color="#6B7280" 
                                    textAlign="center" 
                                    fontSize={16} 
                                    fontWeight="500"
                                    mt={12}
                                >
                                    {t('no_orders_found')}
                                </Text>
                                <Text 
                                    color="#9CA3AF" 
                                    textAlign="center" 
                                    fontSize={14}
                                    mt={4}
                                >
                                    No {activeTab} orders at the moment
                                </Text>
                            </Div>
                        )}
                    </Div>
                )}
            </ScrollDiv>
        </Div>
    )
}

export default Orders