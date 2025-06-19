import React, { useState } from 'react';
import { Div, Text, ScrollDiv, Button } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import { colors } from '../../config/colors';
import Custom_header from '../../custom/Custom_header';
import Custom_input from '../../custom/Custom_input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'toastify-react-native';
import { Pressable, Linking } from 'react-native';

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Help = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Help categories
    const helpCategories = [
        { id: 1, title: t('account_issues'), icon: 'account-circle', color: '#3B82F6' },
        { id: 2, title: t('product_management'), icon: 'inventory', color: '#10B981' },
        { id: 3, title: t('order_problems'), icon: 'shopping-cart', color: '#F59E0B' },
        { id: 4, title: t('payment_issues'), icon: 'payment', color: '#8B5CF6' },
        { id: 5, title: t('technical_support'), icon: 'build', color: '#EF4444' },
        { id: 6, title: t('other'), icon: 'help', color: '#6B7280' },
    ];

    // Priority levels
    const priorityLevels = [
        { id: 1, title: t('low'), value: 'low', color: '#10B981' },
        { id: 2, title: t('medium'), value: 'medium', color: '#F59E0B' },
        { id: 3, title: t('high'), value: 'high', color: '#EF4444' },
        { id: 4, title: t('urgent'), value: 'urgent', color: '#DC2626' },
    ];

    // Validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('name_required')),
        email: Yup.string().email(t('invalid_email')).required(t('email_required')),
        subject: Yup.string().required(t('subject_required')),
        category: Yup.string().required(t('category-required')),
        priority: Yup.string().required(t('priority_required')),
        message: Yup.string().min(10, t('message_min_length')).required(t('message_required')),
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            Toast.success({
                text1: t('help_request_sent'),
                text2: t('help_request_success'),
            });
            
            resetForm();
            setSelectedCategory(null);
        } catch (error) {
            Toast.error({
                text1: t('error'),
                text2: t('help_request_failed'),
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    // Quick action handlers
    const handleCallSupport = () => {
        Linking.openURL('tel:+1234567890');
    };

    const handleEmailSupport = () => {
        Linking.openURL('mailto:support@vendora.com');
    };

    const handleLiveChat = () => {
        Toast.info({
            text1: t('live_chat'),
            text2: t('live_chat_coming_soon'),
        });
    };

    return (
        <Div flex={1} bg="#F1F5F9">
            <Custom_header title={t('help_support')} />

            <ScrollDiv flex={1} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
                    <Div alignItems="center" mb={20}>
                        <Div
                            bg="rgba(59, 130, 246, 0.1)"
                            rounded="full"
                            w={80}
                            h={80}
                            alignItems="center"
                            justifyContent="center"
                            mb={16}
                        >
                            <MaterialIcons name="support-agent" size={40} color="#3B82F6" />
                        </Div>
                        <Text fontSize={24} fontWeight="bold" color="#1F2937" textAlign="center" mb={8}>
                            {t('how_can_we_help')}
                        </Text>
                        <Text fontSize={16} color="#6B7280" textAlign="center" lineHeight={24}>
                            {t('help_description')}
                        </Text>
                    </Div>

                    {/* Quick Actions */}
                    <Div flexDir="row" justifyContent="space-between">
                        <Pressable onPress={handleCallSupport} style={{ flex: 0.32 }}>
                            <Div
                                bg="rgba(34, 197, 94, 0.1)"
                                rounded="2xl"
                                p={16}
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#A7F3D0"
                            >
                                <Feather name="phone" size={24} color="#10B981" />
                                <Text fontSize={12} fontWeight="600" color="#10B981" mt={8} textAlign="center">
                                    {t('call_us')}
                                </Text>
                            </Div>
                        </Pressable>

                        <Pressable onPress={handleEmailSupport} style={{ flex: 0.32 }}>
                            <Div
                                bg="rgba(245, 158, 11, 0.1)"
                                rounded="2xl"
                                p={16}
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#FDE68A"
                            >
                                <MaterialIcons name="email" size={24} color="#F59E0B" />
                                <Text fontSize={12} fontWeight="600" color="#F59E0B" mt={8} textAlign="center">
                                    {t('email_us')}
                                </Text>
                            </Div>
                        </Pressable>

                        <Pressable onPress={handleLiveChat} style={{ flex: 0.32 }}>
                            <Div
                                bg="rgba(139, 69, 19, 0.1)"
                                rounded="2xl"
                                p={16}
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#D69E2E"
                            >
                                <MaterialIcons name="chat" size={24} color="#8B4513" />
                                <Text fontSize={12} fontWeight="600" color="#8B4513" mt={8} textAlign="center">
                                    {t('live_chat')}
                                </Text>
                            </Div>
                        </Pressable>
                    </Div>
                </Div>

                {/* FAQ Section */}
                <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
                    <Div flexDir="row" alignItems="center" mb={20}>
                        <MaterialIcons name="quiz" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('faq')}
                        </Text>
                    </Div>

                    {/* FAQ Items */}
                    <Div>
                        <Pressable>
                            <Div
                                bg="#F8FAFC"
                                rounded="xl"
                                p={16}
                                mb={12}
                                flexDir="row"
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <Div flex={1}>
                                    <Text fontSize={14} fontWeight="600" color="#1F2937">
                                        {t('faq_add_products')}
                                    </Text>
                                </Div>
                                <AntDesign name="right" size={16} color="#6B7280" />
                            </Div>
                        </Pressable>

                        <Pressable>
                            <Div
                                bg="#F8FAFC"
                                rounded="xl"
                                p={16}
                                mb={12}
                                flexDir="row"
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <Div flex={1}>
                                    <Text fontSize={14} fontWeight="600" color="#1F2937">
                                        {t('faq_manage_orders')}
                                    </Text>
                                </Div>
                                <AntDesign name="right" size={16} color="#6B7280" />
                            </Div>
                        </Pressable>

                        <Pressable>
                            <Div
                                bg="#F8FAFC"
                                rounded="xl"
                                p={16}
                                mb={12}
                                flexDir="row"
                                alignItems="center"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <Div flex={1}>
                                    <Text fontSize={14} fontWeight="600" color="#1F2937">
                                        {t('faq_payment_settings')}
                                    </Text>
                                </Div>
                                <AntDesign name="right" size={16} color="#6B7280" />
                            </Div>
                        </Pressable>
                    </Div>
                </Div>

                {/* Contact Form */}
                <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
                    <Div flexDir="row" alignItems="center" mb={20}>
                        <MaterialIcons name="contact-support" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('contact_form')}
                        </Text>
                    </Div>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
                            category: '',
                            priority: '',
                            message: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                            <Div>
                                {/* Category Selection */}
                                <Div mb={20}>
                                    <Text fontSize={14} fontWeight="600" color="#374151" mb={12}>
                                        {t('select-category')}
                                    </Text>
                                    <Div flexDir="row" flexWrap="wrap">
                                        {helpCategories.map((category) => (
                                            <Pressable
                                                key={category.id}
                                                onPress={() => {
                                                    setSelectedCategory(category.id);
                                                    setFieldValue('category', category.title);
                                                }}
                                                style={{ width: '48%', marginBottom: 12, marginRight: category.id % 2 === 1 ? '4%' : 0 }}
                                            >
                                                <Div
                                                    bg={selectedCategory === category.id ? `rgba(${category.color === '#3B82F6' ? '59, 130, 246' : category.color === '#10B981' ? '16, 185, 129' : category.color === '#F59E0B' ? '245, 158, 11' : category.color === '#8B5CF6' ? '139, 92, 246' : category.color === '#EF4444' ? '239, 68, 68' : '107, 114, 128'}, 0.1)` : '#F8FAFC'}
                                                    rounded="xl"
                                                    p={16}
                                                    borderWidth={selectedCategory === category.id ? 2 : 1}
                                                    borderColor={selectedCategory === category.id ? category.color : '#E5E7EB'}
                                                    alignItems="center"
                                                >
                                                    <MaterialIcons 
                                                        name={category.icon} 
                                                        size={24} 
                                                        color={selectedCategory === category.id ? category.color : '#6B7280'} 
                                                    />
                                                    <Text 
                                                        fontSize={12} 
                                                        fontWeight="600" 
                                                        color={selectedCategory === category.id ? category.color : '#6B7280'}
                                                        mt={8}
                                                        textAlign="center"
                                                    >
                                                        {category.title}
                                                    </Text>
                                                </Div>
                                            </Pressable>
                                        ))}
                                    </Div>
                                    {touched.category && errors.category && (
                                        <Text fontSize={12} color="#EF4444" mt={4}>
                                            {errors.category}
                                        </Text>
                                    )}
                                </Div>

                                {/* Name and Email */}
                                <Div flexDir="row" justifyContent="space-between" mb={16}>
                                    <Div flex={0.48}>
                                        <Custom_input
                                            placeholder={t('your_name')}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            error={touched.name && errors.name}
                                            leftIcon="person"
                                        />
                                    </Div>
                                    <Div flex={0.48}>
                                        <Custom_input
                                            placeholder={t('email_address')}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            error={touched.email && errors.email}
                                            keyboardType="email-address"
                                            leftIcon="email"
                                        />
                                    </Div>
                                </Div>

                                {/* Subject */}
                                <Custom_input
                                    placeholder={t('subject')}
                                    value={values.subject}
                                    onChangeText={handleChange('subject')}
                                    onBlur={handleBlur('subject')}
                                    error={touched.subject && errors.subject}
                                    leftIcon="subject"
                                    mb={16}
                                />

                                {/* Priority */}
                                <Div mb={20}>
                                    <Text fontSize={14} fontWeight="600" color="#374151" mb={12}>
                                        {t('priority_level')}
                                    </Text>
                                    <Div flexDir="row" justifyContent="space-between">
                                        {priorityLevels.map((priority) => (
                                            <Pressable
                                                key={priority.id}
                                                onPress={() => setFieldValue('priority', priority.value)}
                                                style={{ flex: 0.23 }}
                                            >
                                                <Div
                                                    bg={values.priority === priority.value ? `rgba(${priority.color === '#10B981' ? '16, 185, 129' : priority.color === '#F59E0B' ? '245, 158, 11' : priority.color === '#EF4444' ? '239, 68, 68' : '220, 38, 38'}, 0.1)` : '#F8FAFC'}
                                                    rounded="xl"
                                                    p={12}
                                                    borderWidth={values.priority === priority.value ? 2 : 1}
                                                    borderColor={values.priority === priority.value ? priority.color : '#E5E7EB'}
                                                    alignItems="center"
                                                >
                                                    <Text 
                                                        fontSize={12} 
                                                        fontWeight="600" 
                                                        color={values.priority === priority.value ? priority.color : '#6B7280'}
                                                    >
                                                        {priority.title}
                                                    </Text>
                                                </Div>
                                            </Pressable>
                                        ))}
                                    </Div>
                                    {touched.priority && errors.priority && (
                                        <Text fontSize={12} color="#EF4444" mt={4}>
                                            {errors.priority}
                                        </Text>
                                    )}
                                </Div>

                                {/* Message */}
                                <Custom_input
                                    placeholder={t('describe_issue')}
                                    value={values.message}
                                    onChangeText={handleChange('message')}
                                    onBlur={handleBlur('message')}
                                    error={touched.message && errors.message}
                                    multiline={true}
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                    leftIcon="message"
                                    mb={24}
                                />

                                {/* Submit Button */}
                                <Button
                                    bg={colors.primary}
                                    rounded="2xl"
                                    py={16}
                                    onPress={handleSubmit}
                                    disabled={isSubmitting || loading}
                                    loading={loading}
                                    shadow="lg"
                                >
                                    <Div flexDir="row" alignItems="center" justifyContent="center">
                                        <MaterialIcons name="send" size={20} color="white" />
                                        <Text color="white" fontSize={16} fontWeight="bold" ml={8}>
                                            {loading ? t('sending') : t('send_message')}
                                        </Text>
                                    </Div>
                                </Button>
                            </Div>
                        )}
                    </Formik>
                </Div>

                {/* Contact Information */}
                <Div bg="white" mx={16} mt={16} mb={32} rounded="3xl" p={24} >
                    <Div flexDir="row" alignItems="center" mb={20}>
                        <MaterialIcons name="contact-phone" size={24} color={colors.primary} />
                        <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
                            {t('contact_information')}
                        </Text>
                    </Div>

                    <Div>
                        <Div flexDir="row" alignItems="center" mb={16}>
                            <Div
                                bg="rgba(34, 197, 94, 0.1)"
                                rounded="xl"
                                w={44}
                                h={44}
                                alignItems="center"
                                justifyContent="center"
                                mr={16}
                            >
                                <Feather name="phone" size={18} color="#10B981" />
                            </Div>
                            <Div>
                                <Text fontSize={14} color="#6B7280" mb={2}>
                                    {t('phone_support')}
                                </Text>
                                <Text fontSize={16} fontWeight="600" color="#1F2937">
                                    +1 (555) 123-4567
                                </Text>
                            </Div>
                        </Div>

                        <Div flexDir="row" alignItems="center" mb={16}>
                            <Div
                                bg="rgba(245, 158, 11, 0.1)"
                                rounded="xl"
                                w={44}
                                h={44}
                                alignItems="center"
                                justifyContent="center"
                                mr={16}
                            >
                                <MaterialIcons name="email" size={18} color="#F59E0B" />
                            </Div>
                            <Div>
                                <Text fontSize={14} color="#6B7280" mb={2}>
                                    {t('email_support')}
                                </Text>
                                <Text fontSize={16} fontWeight="600" color="#1F2937">
                                    support@vendora.com
                                </Text>
                            </Div>
                        </Div>

                        <Div flexDir="row" alignItems="center">
                            <Div
                                bg="rgba(59, 130, 246, 0.1)"
                                rounded="xl"
                                w={44}
                                h={44}
                                alignItems="center"
                                justifyContent="center"
                                mr={16}
                            >
                                <MaterialIcons name="schedule" size={18} color="#3B82F6" />
                            </Div>
                            <Div>
                                <Text fontSize={14} color="#6B7280" mb={2}>
                                    {t('support_hours')}
                                </Text>
                                <Text fontSize={16} fontWeight="600" color="#1F2937">
                                    {t('available_24_7')}
                                </Text>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </ScrollDiv>
        </Div>
    );
};

export default Help;
