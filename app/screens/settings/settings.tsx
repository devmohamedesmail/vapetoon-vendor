import React, { useState, useContext } from 'react';
import { Div, Text, ScrollDiv, Button, Image } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import { colors } from '../../config/colors';
import Custom_Header from '../../custom/custom_header';
import { AuthContext } from '../../context/AuthProvider';
import { Pressable, Alert, Linking, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Settings = () => {
    const { t, i18n } = useTranslation();
    const { auth, handle_logout } = useContext(AuthContext);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [biometricAuth, setBiometricAuth] = useState(false);
    const [autoBackup, setAutoBackup] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // Settings sections
    const accountSettings = [
        {
            id: 1,
            title: t('edit_profile'),
            subtitle: t('update_personal_info'),
            icon: 'account',
            iconColor: '#3B82F6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            onPress: () => handleEditProfile(),
        },
        {
            id: 2,
            title: t('change_password'),
            subtitle: t('update_account_security'),
            icon: 'lock',
            iconColor: '#10B981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            onPress: () => handleChangePassword(),
        },
        {
            id: 3,
            title: t('vendor_settings'),
            subtitle: t('manage_vendor_profile'),
            icon: 'store',
            iconColor: '#F59E0B',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            onPress: () => handleVendorSettings(),
        },
    ];

    const appSettings = [
        {
            id: 1,
            title: t('language'),
            subtitle: t('app_language'),
            icon: 'translate',
            iconColor: '#8B5CF6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
            onPress: () => handleLanguageSettings(),
        },
        {
            id: 2,
            title: t('theme'),
            subtitle: t('app_appearance'),
            icon: 'palette',
            iconColor: '#EF4444',
            bgColor: 'rgba(239, 68, 68, 0.1)',
            onPress: () => handleThemeSettings(),
        },
        {
            id: 3,
            title: t('currency'),
            subtitle: t('default_currency'),
            icon: 'currency-usd',
            iconColor: '#06B6D4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            onPress: () => handleCurrencySettings(),
        },
    ];

    const securitySettings = [
        {
            id: 1,
            title: t('two_factor_auth'),
            subtitle: t('enable_2fa'),
            icon: 'shield',
            iconColor: '#10B981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            onPress: () => handleTwoFactorAuth(),
        },
        {
            id: 2,
            title: t('privacy_settings'),
            subtitle: t('data_privacy'),
            icon: 'shield',
            iconColor: '#3B82F6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            onPress: () => handlePrivacySettings(),
        },
        {
            id: 3,
            title: t('backup_restore'),
            subtitle: t('data_backup'),
            icon: 'backup',
            iconColor: '#F59E0B',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            onPress: () => handleBackupRestore(),
        },
    ];

    const supportSettings = [
        {
            id: 1,
            title: t('help_center'),
            subtitle: t('get_help_support'),
            icon: 'help',
            iconColor: '#10B981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            onPress: () => handleHelpCenter(),
        },
        {
            id: 2,
            title: t('contact_support'),
            subtitle: t('reach_out_to_us'),
            icon: 'email',
            iconColor: '#3B82F6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            onPress: () => handleContactSupport(),
        },
        {
            id: 3,
            title: t('rate_app'),
            subtitle: t('rate_on_store'),
            icon: 'star',
            iconColor: '#F59E0B',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            onPress: () => handleRateApp(),
        },
    ];

    // Handler functions
    const handleEditProfile = () => {
        Toast.show({
            type: 'info',
            text1: t('coming_soon'),
            text2: t('profile_edit_coming_soon'),
        });
    };

    const handleChangePassword = () => {
        Toast.show({
            type: 'info',
            text1: t('coming_soon'),
            text2: t('password_change_coming_soon'),
        });
    };

    const handleVendorSettings = () => {
        Toast.show({
            type: 'info',
            text1: t('coming_soon'),
            text2: t('vendor_settings_coming_soon'),
        });
    };

    const handleLanguageSettings = () => {
        Alert.alert(
            t('select_language'),
            t('choose_app_language'),
            [
                { text: 'English', onPress: () => changeLanguage('en') },
                { text: 'العربية', onPress: () => changeLanguage('ar') },
                { text: t('cancel'), style: 'cancel' },
            ]
        );
    };

    const changeLanguage = async (lang) => {
        try {
            await i18n.changeLanguage(lang);
            await AsyncStorage.setItem('language', lang);
            Toast.show({
                type: 'success',
                text1: t('language_changed'),
                text2: t('language_updated_successfully'),
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('error'),
                text2: t('language_change_failed'),
            });
        }
    };

    const handleThemeSettings = () => {
        Alert.alert(
            t('select_theme'),
            t('choose_app_theme'),
            [
                { text: t('light_theme'), onPress: () => changeTheme('light') },
                { text: t('dark_theme'), onPress: () => changeTheme('dark') },
                { text: t('system_default'), onPress: () => changeTheme('system') },
                { text: t('cancel'), style: 'cancel' },
            ]
        );
    };

    const changeTheme = (theme) => {
        setDarkMode(theme === 'dark');
        Toast.show({
            type: 'success',
            text1: t('theme_changed'),
            text2: t('theme_updated_successfully'),
        });
    };

    const handleCurrencySettings = () => {
        Alert.alert(
            t('select_currency'),
            t('choose_default_currency'),
            [
                { text: 'USD ($)', onPress: () => changeCurrency('USD') },
                { text: 'EUR (€)', onPress: () => changeCurrency('EUR') },
                { text: 'GBP (£)', onPress: () => changeCurrency('GBP') },
                { text: 'SAR (ر.س)', onPress: () => changeCurrency('SAR') },
                { text: t('cancel'), style: 'cancel' },
            ]
        );
    };

    const changeCurrency = (currency) => {
        Toast.show({
            type: 'success',
            text1: t('currency_changed'),
            text2: `${t('currency_updated_to')} ${currency}`,
        });
    };

    const handleTwoFactorAuth = () => {
        Toast.show({
            type: 'info',
            text1: t('coming_soon'),
            text2: t('two_factor_coming_soon'),
        });
    };

    const handlePrivacySettings = () => {
        Toast.show({
            type: 'info',
            text1: t('coming_soon'),
            text2: t('privacy_settings_coming_soon'),
        });
    };

    const handleBackupRestore = () => {
        Alert.alert(
            t('backup_restore'),
            t('backup_restore_description'),
            [
                { text: t('backup_now'), onPress: () => performBackup() },
                { text: t('restore_data'), onPress: () => performRestore() },
                { text: t('cancel'), style: 'cancel' },
            ]
        );
    };

    const performBackup = () => {
        Toast.show({
            type: 'success',
            text1: t('backup_successful'),
            text2: t('data_backed_up_successfully'),
        });
    };

    const performRestore = () => {
        Toast.show({
            type: 'info',
            text1: t('restore_initiated'),
            text2: t('data_restore_in_progress'),
        });
    };

    const handleHelpCenter = () => {
        // Navigate to Help screen
        Toast.show({
            type: 'info',
            text1: t('help_center'),
            text2: t('redirecting_to_help'),
        });
    };

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@vendora.com');
    };

    const handleRateApp = () => {
        // Open app store rating
        Toast.show({
            type: 'info',
            text1: t('rate_app'),
            text2: t('redirecting_to_store'),
        });
    };

    const handleLogout = () => {
        Alert.alert(
            t('logout'),
            t('logout_confirmation'),
            [
                { text: t('cancel'), style: 'cancel' },
                { text: t('logout'), style: 'destructive', onPress: () => handle_logout() },
            ]
        );
    };

    const renderSettingItem = (item) => (
        <Pressable key={item.id} onPress={item.onPress}>
            <Div
                bg="white"
                rounded="2xl"
                p={20}
                mb={12}
                flexDir="row"
                alignItems="center"
                shadow="sm"
                borderWidth={1}
                borderColor="#F1F5F9"
            >
                <Div
                    bg={item.bgColor}
                    rounded="xl"
                    w={48}
                    h={48}
                    alignItems="center"
                    justifyContent="center"
                    mr={16}
                >
                    <MaterialCommunityIcons name={item.icon} size={24} color={item.iconColor} />
                </Div>
                <Div flex={1}>
                    <Text fontSize={16} fontWeight="600" color="#1F2937" mb={4}>
                        {item.title}
                    </Text>
                    <Text fontSize={14} color="#6B7280">
                        {item.subtitle}
                    </Text>
                </Div>
                <AntDesign name="right" size={16} color="#9CA3AF" />
            </Div>
        </Pressable>
    );

    const renderToggleItem = (title, subtitle, value, onValueChange, icon, iconColor, bgColor) => (
        <Div
            bg="white"
            rounded="2xl"
            p={20}
            mb={12}
            flexDir="row"
            alignItems="center"
            shadow="sm"
            borderWidth={1}
            borderColor="#F1F5F9"
        >
            <Div
                bg={bgColor}
                rounded="xl"
                w={48}
                h={48}
                alignItems="center"
                justifyContent="center"
                mr={16}
            >
                <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
            </Div>
            <Div flex={1}>
                <Text fontSize={16} fontWeight="600" color="#1F2937" mb={4}>
                    {title}
                </Text>
                <Text fontSize={14} color="#6B7280">
                    {subtitle}
                </Text>
            </Div>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#E5E7EB", true: colors.primary }}
                thumbColor={value ? "#ffffff" : "#f4f3f4"}
            />
        </Div>
    );

    return (
        <Div flex={1} bg="#F8FAFC">
            <Custom_Header title={t('settings')} />

            <ScrollDiv flex={1} showsVerticalScrollIndicator={false}>
                {/* User Profile Section */}
                <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} shadow="sm">
                    <Div flexDir="row" alignItems="center" mb={20}>
                        <Div
                            w={80}
                            h={80}
                            rounded="circle"
                            bg={colors.primary}
                            justifyContent="center"
                            alignItems="center"
                            mr={20}
                        >
                            <Text fontSize={32} fontWeight="bold" color="white">
                                {auth?.user?.username?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </Div>
                        <Div flex={1}>
                            <Text fontSize={20} fontWeight="bold" color="#1F2937" mb={4}>
                                {auth?.user?.username || t('user')}
                            </Text>
                            <Text fontSize={16} color="#6B7280" mb={8}>
                                {auth?.user?.email || t('email_not_available')}
                            </Text>
                            <Div
                                bg="rgba(34, 197, 94, 0.1)"
                                rounded="lg"
                                px={12}
                                py={6}
                                alignSelf="flex-start"
                            >
                                <Text fontSize={12} fontWeight="600" color="#10B981">
                                    {t('verified_vendor')}
                                </Text>
                            </Div>
                        </Div>
                    </Div>
                </Div>

                {/* Account Settings */}
                <Div mx={16} mt={20}>
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialCommunityIcons name="account" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('account_settings')}
                        </Text>
                    </Div>
                    {accountSettings.map(renderSettingItem)}
                </Div>

                {/* Notification Settings */}
                <Div mx={16} mt={20}>
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialCommunityIcons name="bell" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('notifications')}
                        </Text>
                    </Div>
                    {renderToggleItem(
                        t('push_notifications'),
                        t('receive_push_notifications'),
                        pushNotifications,
                        setPushNotifications,
                        'bell',
                        '#3B82F6',
                        'rgba(59, 130, 246, 0.1)'
                    )}
                    {renderToggleItem(
                        t('email_notifications'),
                        t('receive_email_notifications'),
                        emailNotifications,
                        setEmailNotifications,
                        'email',
                        '#10B981',
                        'rgba(16, 185, 129, 0.1)'
                    )}
                    {renderToggleItem(
                        t('order_notifications'),
                        t('new_order_alerts'),
                        notificationsEnabled,
                        setNotificationsEnabled,
                        'package-variant',
                        '#F59E0B',
                        'rgba(245, 158, 11, 0.1)'
                    )}
                </Div>

                {/* App Settings */}
                <Div mx={16} mt={20}>
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialCommunityIcons name="cog" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('app_settings')}
                        </Text>
                    </Div>
                    {appSettings.map(renderSettingItem)}
                </Div>

                {/* Security & Privacy */}
                <Div mx={16} mt={20}>
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialCommunityIcons name="shield" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('security_privacy')}
                        </Text>
                    </Div>
                    {securitySettings.map(renderSettingItem)}
                    {renderToggleItem(
                        t('biometric_auth'),
                        t('use_fingerprint_face'),
                        biometricAuth,
                        setBiometricAuth,
                        'fingerprint',
                        '#8B5CF6',
                        'rgba(139, 92, 246, 0.1)'
                    )}
                    {renderToggleItem(
                        t('auto_backup'),
                        t('automatic_data_backup'),
                        autoBackup,
                        setAutoBackup,
                        'backup-restore',
                        '#06B6D4',
                        'rgba(6, 182, 212, 0.1)'
                    )}
                </Div>

                {/* Support & About */}
                <Div mx={16} mt={20}>
                    <Div flexDir="row" alignItems="center" mb={16}>
                        <MaterialCommunityIcons name="help" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('support_about')}
                        </Text>
                    </Div>
                    {supportSettings.map(renderSettingItem)}
                </Div>

                {/* App Version */}
                <Div mx={16} mt={20} mb={20}>
                    <Div
                        bg="white"
                        rounded="2xl"
                        p={20}
                        shadow="sm"
                        borderWidth={1}
                        borderColor="#F1F5F9"
                        alignItems="center"
                    >
                        <Text fontSize={14} color="#6B7280" mb={4}>
                            {t('app_version')}
                        </Text>
                        <Text fontSize={16} fontWeight="600" color="#1F2937">
                            Vendora v1.0.0
                        </Text>
                    </Div>
                </Div>

                {/* Logout Button */}
                <Div mx={16} mb={32}>
                    <Button
                        bg="#EF4444"
                        rounded="2xl"
                        py={18}
                        onPress={handleLogout}
                        shadow="lg"
                    >
                        <Div flexDir="row" alignItems="center" justifyContent="center">
                            <MaterialCommunityIcons name="logout" size={20} color="white" />
                            <Text color="white" fontSize={16} fontWeight="bold" ml={8}>
                                {t('logout')}
                            </Text>
                        </Div>
                    </Button>
                </Div>
            </ScrollDiv>
        </Div>
    );
};

export default Settings;
