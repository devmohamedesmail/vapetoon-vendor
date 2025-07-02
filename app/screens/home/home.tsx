import React from 'react'
import { RefreshControl } from 'react-native'
import { Div, ScrollDiv, Text, Header, Button, Icon, Skeleton, Image } from 'react-native-magnus'
import Custom_Home_Item from '../../custom/custom_home_item'
import { colors } from '../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useState, useEffect } from 'react'
import { api } from '../../config/api'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Skeleton_loading_item from '../../items/Skeleton_loading_item'
import { AntDesign, FontAwesome, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';



import Custom_Header from '../../custom/custom_header'
export default function Home() {
    const { auth } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchVendor = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${api.baseURL}/vendors?filters[user][id][$eq]=${auth.user.id}&populate[logo]=true&populate[banner]=true&populate[user]=true`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                }
            }
            );
            if (res.data && res.data.data && res.data.data.length > 0) {
                setVendor(res.data.data[0]);
            } else {
                setVendor(null);
            }

        } catch (err) {
            console.log(err);
            setVendor(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVendor();
    }, [auth])



    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchVendor();
        setRefreshing(false);
    }, []);

    return (
        <Div bg="white" flex={1} >
            <ScrollDiv
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } >



                <Custom_Header title={t('home')} />




                {loading ? (
                    <Skeleton_loading_item />
                ) : vendor ? (
                    <Div h="100%" position='relative'>

                        <Div px={10} py={20} flexDir='row' alignItems='center' >
                            <Image w={70} h={70} rounded="circle" source={{ uri: `${vendor?.logo?.formats?.thumbnail?.url}` }} />
                            <Div mx={10}>
                                <Text fontWeight="bold" fontSize={20}>{vendor.vendor_name}</Text>

                                <Text color="gray700" mb={10}>
                                    {t('owner')}: {vendor.user?.username}
                                </Text>
                                <Text color="gray700" mb={10}>
                                    {t('vendor-no')}: {vendor.id}
                                </Text>
                            </Div>
                        </Div>



                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-between' mt={10} alignItems='center' px={10}>
                            <Custom_Home_Item
                                icon={<AntDesign name="pluscircleo" size={35} color={colors.primary} />}
                                title={t('add-product')}
                                onPress={() => navigation.navigate('AddProduct', { vendorId: vendor.id })}
                            />

                            <Custom_Home_Item
                                icon={<FontAwesome name="product-hunt" size={35} color={colors.primary} />}
                                title={t('my-products')}
                                onPress={() => navigation.navigate('Show', { vendorId: vendor.id })}
                            />
                            <Custom_Home_Item
                                icon={<MaterialIcons name="list-alt" size={35} color={colors.primary} />}
                                title={'Orders'}
                                onPress={() => navigation.navigate('Orders', { vendorId: vendor.id })}
                            />
                            <Custom_Home_Item
                                icon={<Entypo name="shop" size={35} color={colors.primary} />}
                                title={'Store'}
                                onPress={() => navigation.navigate('UpdateVendor', { vendor: vendor })}
                            />
                            <Custom_Home_Item
                                icon={<Feather name="help-circle" size={35} color={colors.primary} />}
                                title={t('help_support')}
                                onPress={() => navigation.navigate('Help')}
                            />
                        </Div>


                    </Div>
                ) : (
                    <Div px={10} py={20} alignItems="center" justifyContent='center' >


                        <Image w={200} h={200} source={require('../../../assets/images/shop.jpg')} />
                        <Text fontWeight="bold" fontSize={20} mb={20}>{t('no_vendor-found')}</Text>
                        <Button
                            bg={colors.secondary}
                            color="white"
                            px={30}
                            fontWeight='bold'
                            rounded={30}
                            py={15}
                            alignSelf='center'
                            // onPress={() => navigation.navigate('CreateVendor')}
                            onPress={() => navigation.navigate('CreateVendor', { fetchVendor })}
                        >
                            {t('create-vendor')}
                        </Button>
                    </Div>
                )}

            </ScrollDiv>
        </Div>
    )
}