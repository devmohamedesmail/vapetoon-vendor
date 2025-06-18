import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Toast } from "toastify-react-native"
import { Button, Div, Icon, Text } from 'react-native-magnus';
function ToggleLang() {
    const { t, i18n } = useTranslation();
    const handleLanguageChange = async () => {
        try {
            const currentLanguage = i18n.language;
            const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';

            // Change language
            await i18n.changeLanguage(newLanguage);

            // Save to AsyncStorage for persistence
            await AsyncStorage.setItem('userLanguage', newLanguage);

            // Optional: Show toast notification
            Toast.show({
                type: 'success',
                text1: t('language_changed'),
                position: 'top',
                visibilityTime: 2000,
            });
        } catch (error) {
            console.log('Error changing language:', error);
        }
    };


    return (
        <Button
            bg="#FDF2F8"
            borderWidth={0}
            rounded="2xl"
            mb={15}
            px={20}
            py={18}
            w="100%"
            justifyContent="flex-start"
            shadow="sm"
            onPress={handleLanguageChange}
        >
            <Div flexDir="row" alignItems="center" w="100%">
                <Div
                    bg="#EC4899"
                    rounded="circle"
                    w={40}
                    h={40}
                    justifyContent="center"
                    alignItems="center"
                    mr={15}
                >
                    <Icon name="globe" fontFamily="Feather"  color="white" />
                </Div>
                <Text fontSize={16} fontWeight="600" color="#EC4899" flex={1} textAlign="left">
                    {t('change_language')} ({i18n.language === 'en' ? 'العربية' : 'English'})
                </Text>
                <Icon name="chevron-right" fontFamily="Feather"  color="#94A3B8" />
            </Div>
        </Button>
    )
}

export default ToggleLang