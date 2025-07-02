
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'
import Custom_header from '../../custom/custom_header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import Custom_Button from '../../custom/custom_button';
import Custom_Input from '../../custom/custom_input';
import Custom_Image_Picker from '../../custom/custom_image_picker';
import { api } from '../../config/api';
import { uploadImagesToStrapi } from '../../utils/upload_images';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { Toast } from 'toastify-react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

import { RouteProp } from '@react-navigation/native';



type CreateVendorRouteParams = {
  fetchVendor?: () => void;
};
const CreateVendor = () => {
  const { t } = useTranslation();
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext)
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<Record<string, CreateVendorRouteParams>, string>>();
  const fetchVendor = route.params?.fetchVendor;

  const formik = useFormik({
    initialValues: {
      vendor_name: '',
      phone: '',
      logo: '',
      banner: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      vendor_name: Yup.string().required(t('vendor-name-required')),
      phone: Yup.string().required(t('phone-required')),
      logo: Yup.string().required(t('logo-required')),
      banner: Yup.string().required(t('banner-required')),
      description: Yup.string().required(t('description-required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Upload logo and banner (single image each)
        const logoIds = logo ? await uploadImagesToStrapi([logo]) : [];
        const bannerIds = banner ? await uploadImagesToStrapi([banner]) : [];

        const payload = {
          data: {
            vendor_name: values.vendor_name,
            phone: values.phone,
            logo: logoIds.length ? logoIds[0] : null,
            banner: bannerIds.length ? bannerIds[0] : null,
            description: values.description,
            user_id: auth.user.id,
            user: auth.user.id,
          },
        };

        const response = await axios.post(
          `${api.baseURL}/vendors`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${api.token}`,
            },
          }
        );





        Toast.show({
          type: 'success',
          text1: `${t('vendor-created-successfully')}`,
         
        })
      
        fetchVendor();
        navigation.goBack();
      } catch (error) {
        console.log(error);

        Toast.show({
          type: 'error',
          text1: `${t('failed-to-create-vendor')}`,
          
        })
      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <Div bg="white" flex={1}>
      <Custom_header title={t('create-vendor')} />

      <ScrollDiv>
        <Div px={10} py={20} pb={250}>
          <Custom_Input
            placeholder={t('store-name')}
            value={formik.values.vendor_name}
            onChangeText={formik.handleChange('vendor_name')}
            error={formik.errors.vendor_name}
          />



          <Custom_Input
            placeholder={t('phone')}
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            error={formik.errors.phone}
          />
          <Custom_Input
            placeholder={t('description')}
            value={formik.values.description}
            onChangeText={formik.handleChange('description')}
            error={formik.errors.description}
            multiline
          />



          <Custom_Image_Picker
            image={logo}
            setImage={img => {
              setLogo(img);
              formik.setFieldValue('logo', img ? 'selected' : '');
            }}
            label={t('pick-logo')}
          />
          {formik.errors.logo && <Div><Text style={{ color: 'red' }}>{formik.errors.logo}</Text></Div>}




          <Custom_Image_Picker
            image={banner}
            setImage={img => {
              setBanner(img);
              formik.setFieldValue('banner', img ? 'selected' : '');
            }}
            label={t('pick-banner')}
          />
          {formik.errors.banner && <Div><Text style={{ color: 'red' }}>{formik.errors.banner}</Text></Div>}

          <Custom_Button
            mt={100}
            title={loading ? t('creating') : t('create-vendor')}
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

export default CreateVendor