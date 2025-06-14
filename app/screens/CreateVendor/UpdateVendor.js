import React, { useState } from 'react'
import { Div, Image, ScrollDiv, Text } from 'react-native-magnus'
import Custom_header from '../../custom/Custom_header'
import { useTranslation } from 'react-i18next'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFormik } from 'formik'
import Custom_input from '../../custom/Custom_input'
import Custom_image_picker from '../../custom/Custom_image_picker'
import Custom_button from '../../custom/Custom_button'
import { uploadImagesToStrapi } from '../../utils/upload_images'
import { Toast } from 'toastify-react-native'
import axios from 'axios'
import { api } from '../../config/api'
import { colors } from '../../config/colors'

const UpdateVendor = () => {
    const { t } = useTranslation();
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { vendor } = route.params;


    const formik = useFormik({
        initialValues: {

            vendor_name: vendor.vendor_name || '',
            phone: vendor.phone || '',
            logo: vendor.logo || '',
            banner: vendor.banner || '',
            description: vendor.description || '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const logoIds = logo
                    ? await uploadImagesToStrapi([logo])
                    : vendor.logo?.id
                        ? [vendor.logo.id]
                        : [];
                const bannerIds = banner
                    ? await uploadImagesToStrapi([banner])
                    : vendor.banner?.id
                        ? [vendor.banner.id]
                        : [];

                const payload = {
                    data: {
                        // id: vendor.id,
                        vendor_name: values.vendor_name,
                        phone: values.phone,
                        logo: logoIds.length ? logoIds[0] : null,
                        banner: bannerIds.length ? bannerIds[0] : null,
                        description: values.description,
                        // user_id: auth.user.id,
                        // user: auth.user.id,
                    },
                };
                const response = await axios.put(
                    `${api.baseURL}/vendors/${vendor.documentId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${api.token}`,
                        },
                    }
                );
                Toast.show({
                    type: 'success',
                    text1: 'Vendor updated successfully',
                    duration: 3000,
                })
                setLoading(false);
                navigation.navigate("Home");

            } catch (error) {
                console.error('Error updating vendor:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update vendor',
                    duration: 3000,
                });
                setLoading(false);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Div bg={colors.screenBackground}>
            <Custom_header title={t('update-store')} />
            <ScrollDiv>

                <Div px={10} py={20} pb={250}>
                    <Custom_input
                        placeholder={t('store-name')}
                        value={formik.values.vendor_name}
                        onChangeText={formik.handleChange('vendor_name')}
                        error={formik.errors.vendor_name}
                    />



                    <Custom_input
                        placeholder={t('phone')}
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        error={formik.errors.phone}
                    />
                    <Custom_input
                        placeholder={t('description')}
                        value={formik.values.description}
                        onChangeText={formik.handleChange('description')}
                        error={formik.errors.description}
                        multiline
                    />

                    <Image alignSelf='center' w={100} h={100} source={{ uri: vendor.logo.formats.thumbnail.url }} />

                    <Custom_image_picker
                        image={logo}
                        setImage={img => {
                            setLogo(img);
                            formik.setFieldValue('logo', img ? 'selected' : '');
                        }}
                        label={t('pick-logo')}
                    />
                    {formik.errors.logo && <Div><Text style={{ color: 'red' }}>{formik.errors.logo}</Text></Div>}



                    <Image alignSelf='center' w={100} h={100} source={{ uri: vendor.banner.formats.thumbnail.url }} />
                    <Custom_image_picker
                        image={banner}
                        setImage={img => {
                            setBanner(img);
                            formik.setFieldValue('banner', img ? 'selected' : '');
                        }}
                        label={t('pick-banner')}
                    />
                    {formik.errors.banner && <Div><Text style={{ color: 'red' }}>{formik.errors.banner}</Text></Div>}

                    <Custom_button
                        mt={100}
                        title={loading ? t('updating') : t('update-store')}
                        onPress={() => {
                            formik.handleSubmit();
                        }}
                        disabled={!formik.isValid || loading}
                    />
                </Div>
            </ScrollDiv>
        </Div>
    )
}

export default UpdateVendor