
import { Div, ScrollDiv, Text, Header, Button, Icon, Skeleton, Image } from 'react-native-magnus'
import Custom_home_item from '../../custom/Custom_home_item'
import { colors } from '../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useState, useEffect } from 'react'
import { api } from '../../config/api'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
export default function Home() {
    const { auth } = useContext(AuthContext);
    const navigation = useNavigation();

    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
   
    console.log(auth?.user?.id)
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://ecommerce-strapi-ex18.onrender.com/api/vendors?filters[user][id][$eq]=${auth.user.id}&populate[logo]=true&populate[banner]=true&populate[user]=true`, {
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
        fetchVendor();
    }, [])

    return (
        <Div>
            <ScrollDiv>

                <Header
                    p="lg"
                    bg={colors.secondary}
                    alignment="left"
                    color="white"
                    pt={40}
                    prefix={
                        <Button bg="transparent">
                            <Icon name="arrow-left" fontFamily="Feather" color='white' fontSize="2xl" />
                        </Button>
                    }
                    suffix={
                        <Button bg="transparent">
                            <Icon name="more-vertical" fontFamily="Feather" color='white' />
                        </Button>
                    }
                >
                    {t('home')}
                </Header>




                {loading ? (
                    <Div px={10} py={20}>
                        <Skeleton.Box h={30} w={200} mb={10} />
                        <Skeleton.Box h={20} w={150} mb={10} />
                        <Skeleton.Box h={100} w={'100%'} />
                    </Div>
                ) : vendor ? (
                    <>

                        <Div px={10} py={20} flexDir='row' alignItems='center' bg="white">
                            <Image w={100} h={100} rounded="circle" source={{ uri: `${vendor?.logo?.formats?.thumbnail?.url}` }} />
                            <Div mx={10}>
                                <Text fontWeight="bold" fontSize={20}>{vendor.vendor_name}</Text>

                                <Text color="gray700" mb={10}>
                                    t{'owner'}: {vendor.user?.username}
                                </Text>
                            </Div>
                        </Div>



                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-between' mt={10} alignItems='center' px={10}>
                            <Custom_home_item
                                icon={require('../../../assets/images/products.png')}
                                title={'products'}
                                onPress={() => navigation.navigate('AddProduct')}
                            />
                            <Custom_home_item
                                icon={require('../../../assets/images/orders.png')}
                                title={'Orders'}
                            />
                            <Custom_home_item
                                icon={require('../../../assets/images/store.png')}
                                title={'Store'}
                            />
                        </Div>
                    </>
                ) : (
                    <Div px={10} py={20} alignItems="center" justifyContent='center' >
                        <Text fontWeight="bold" fontSize={20} mb={20}>{t('no_vendor-found')}</Text>
                        <Button
                            bg={colors.primary}
                            color="white"
                            px={30}
                            py={15}   
                            alignSelf='center'
                            onPress={() => navigation.navigate('CreateVendor')}
                        >
                            {t('create-vendor')}
                        </Button>
                    </Div>
                )}

            </ScrollDiv>
        </Div>
    )
}