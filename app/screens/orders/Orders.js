
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, Div, ScrollDiv, Text } from 'react-native-magnus';
import Custom_header from '../../custom/Custom_header';
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
    const { vendorId } = route.params || 22;
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
            const response = await axios.get(`https://ecommerce-strapi-ex18.onrender.com/api/orders?filters[vendor_id][$eq]=${vendorId}`, {
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
        <Div flex={1} bg="white">
            <Custom_header title={t('my-orders')} />
            <Div px={10} mt={10}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {orderTabs.map(tab => (
                        // <Button
                        //     key={tab.key}
                        //     bg={activeTab === tab.key ? colors.primary : colors.secondary}
                        //     color={activeTab === tab.key ? 'white' : 'white'}
                        //     px={12}
                        //     py={8}
                        //     rounded="md"
                        //     mx={2}
                        //     onPress={() => setActiveTab(tab.key)}
                        // >
                        //     <Text color='white'>{t(tab.label)}</Text>
                        // </Button>
                        <Button_tab
                            icon={tab.icon}
                            bg={activeTab === tab.key ? colors.primary : colors.secondary}
                            onPress={() => setActiveTab(tab.key)}
                            color={activeTab === tab.key ? 'white' : 'white'}
                            key={tab.key}
                            title={t(tab.label)}
                        />
                    ))}
                </ScrollView>
            </Div>
            <ScrollDiv>
                

                {loading ? (
                    <Skeleton_loading_item />
                ):(
                    <Div px={10} py={10}>
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
                        <Text color="gray700" textAlign='center'>{t('no_orders_found')}</Text>
                    )}
                </Div>
                )}




            </ScrollDiv>
        </Div>
    )
}

export default Orders