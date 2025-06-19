import { Div, Header, Button, Icon, Drawer, Text } from "react-native-magnus"
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/colors";
import React, { useContext, useRef } from "react";
import Custom_button from "./Custom_button";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToggleLang from "../components/toggleLang";

const Custom_header = ({ title }) => {
    const navigation = useNavigation();
    const drawerRef = React.createRef();
    const { auth, handle_logout } = useContext(AuthContext)
    const { t, i18n } = useTranslation();

    

    return (
        <>

            <Header
                p="lg"
                bg={colors.secondary}
                alignment="left"
                color="white"
                pt={40}
                prefix={
                    <Button bg="transparent" onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" fontFamily="Feather" color="white" fontSize="2xl" />
                    </Button>
                }
                suffix={
                    <Button bg="transparent" onPress={() => {
                        if (drawerRef.current) {
                            drawerRef.current.open();
                        }
                    }}>
                        <Icon name="more-vertical" fontFamily="Feather" color="white" />
                    </Button>
                }
            >
                {title}
            </Header>



            <Drawer ref={drawerRef} drawerPercentage={90}>
                <Div flex={1} bg={{ linearGradient: "180deg, #667eea 0%, #764ba2 100%" }}>
                    {/* Header Section */}
                    <Div pt={20} pb={20} px={20} bg={colors.secondary} alignItems="center">
                        <Div
                            w={50}
                            h={50}
                            rounded="circle"
                            bg="white"
                            justifyContent="center"
                            alignItems="center"
                            mb={15}
                        >
                            <Text fontSize={28} fontWeight="bold" color={colors.primary}>
                                {auth?.user?.username?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </Div>
                        <Text fontSize={20} fontWeight="bold" color="white" mb={5}>
                            {auth?.user?.username}
                        </Text>
                        <Text fontSize={14} color="white" opacity={0.8}>
                            {auth?.user?.email}
                        </Text>
                    </Div>

                    {/* Navigation Menu */}
                    <Div flex={1} bg="white" roundedTop={30} px={20} pt={30}>
                        <Button
                            bg="#F8FAFC"
                            borderWidth={0}
                            rounded="2xl"
                            mb={10}
                            px={20}
                            py={18}
                            w="100%"
                            justifyContent="flex-start"
                            shadow="sm"
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Div flexDir="row" alignItems="center" w="100%">
                                <Div
                                    bg={colors.primary}
                                    rounded="circle"
                                    w={40}
                                    h={40}
                                    justifyContent="center"
                                    alignItems="center"
                                    mr={15}
                                >
                                    <Icon name="user" fontFamily="Feather" size={18} color="white" />
                                </Div>
                                <Text fontSize={16} fontWeight="600" color={colors.primary} flex={1} textAlign="left">
                                    {t('profile')}
                                </Text>
                                <Icon name="chevron-right" fontFamily="Feather" size={18} color="#94A3B8" />
                            </Div>
                        </Button>

                        <Button
                            bg="#FEF7FF"
                            borderWidth={0}
                            rounded="2xl"
                            mb={10}
                            px={20}
                            py={18}
                            w="100%"
                            justifyContent="flex-start"
                            shadow="sm"
                            onPress={() => navigation.navigate('Orders')}
                        >
                            <Div flexDir="row" alignItems="center" w="100%">
                                <Div
                                    bg="#8B5CF6"
                                    rounded="circle"
                                    w={40}
                                    h={40}
                                    justifyContent="center"
                                    alignItems="center"
                                    mr={15}
                                >
                                    <Icon name="package" fontFamily="Feather" size={18} color="white" />
                                </Div>
                                <Text fontSize={16} fontWeight="600" color="#8B5CF6" flex={1} textAlign="left">
                                    {t('orders')}
                                </Text>
                                <Icon name="chevron-right" fontFamily="Feather" size={18} color="#94A3B8" />
                            </Div>
                        </Button>

                        <Button
                            bg="#F0FDF4"
                            borderWidth={0}
                            rounded="2xl"
                            mb={10}
                            px={20}
                            py={18}
                            w="100%"
                            justifyContent="flex-start"
                            shadow="sm"
                            onPress={() => {
                                if (drawerRef.current) {
                                    drawerRef.current.close();
                                }
                                setTimeout(()=>{
                                    navigation.navigate('Settings')
                                }, 1000)
                            }}
                        >
                            <Div flexDir="row" alignItems="center" w="100%">
                                <Div
                                    bg="#10B981"
                                    rounded="circle"
                                    w={40}
                                    h={40}
                                    justifyContent="center"
                                    alignItems="center"
                                    mr={15}
                                >
                                    <Icon name="settings" fontFamily="Feather" size={18} color="white" />
                                </Div>
                                <Text fontSize={16} fontWeight="600" color="#10B981" flex={1} textAlign="left">
                                    {t('settings')}
                                </Text>
                                <Icon name="chevron-right" fontFamily="Feather" size={18} color="#94A3B8" />
                            </Div>
                        </Button>

                        <Button
                            bg="#FEF3C7"
                            borderWidth={0}
                            rounded="2xl"
                            mb={10}
                            px={20}
                            py={18}
                            w="100%"
                            justifyContent="flex-start"
                            shadow="sm"
                            onPress={() => {
                                if (drawerRef.current) {
                                    drawerRef.current.close();
                                }
                                setTimeout(() => {
                                    navigation.navigate('Help')
                                }, 1000);
                               
                            }}
                        >
                            <Div flexDir="row" alignItems="center" w="100%">
                                <Div
                                    bg="#F59E0B"
                                    rounded="circle"
                                    w={40}
                                    h={40}
                                    justifyContent="center"
                                    alignItems="center"
                                    mr={15}
                                >
                                    <Icon name="help-circle" fontFamily="Feather" size={18} color="white" />
                                </Div>
                                <Text fontSize={16} fontWeight="600" color="#F59E0B" flex={1} textAlign="left">
                                    {t('help')}
                                </Text>
                                <Icon name="chevron-right" fontFamily="Feather" size={18} color="#94A3B8" />
                            </Div>
                        </Button>

                        {/* Language Toggle */}
                        <ToggleLang />

                        {/* Bottom Section */}
                        <Div position="absolute" bottom={30} left={20} right={20}>
                            <Button
                                bg="#EF4444"
                                rounded="2xl"
                                px={20}
                                py={18}
                                w="100%"
                                shadow="md"
                                onPress={() => handle_logout()}
                            >
                                <Div flexDir="row" alignItems="center" justifyContent="center">
                                    <Div
                                        bg="rgba(255,255,255,0.2)"
                                        rounded="circle"
                                        w={36}
                                        h={36}
                                        justifyContent="center"
                                        alignItems="center"
                                        mr={12}
                                    >
                                        <Icon name="log-out" fontFamily="Feather" size={18} color="white" />
                                    </Div>
                                    <Text fontSize={16} fontWeight="700" color="white">
                                        {t('logout')}
                                    </Text>
                                </Div>
                            </Button>
                        </Div>
                    </Div>
                </Div>
            </Drawer>
        </>
    )
}

export default Custom_header