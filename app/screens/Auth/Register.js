import Custom_input from "../../custom/Custom_input"
import { Div } from "react-native-magnus"
import Custom_button from "../../custom/Custom_button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useTranslation } from "react-i18next"
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext,useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { useNavigation } from "@react-navigation/native"
const Register = () => {
    const { t } = useTranslation();
    const { handle_register } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(t('username_required')),
            email: Yup.string().email(t('invalid_email')).required(t('email_required')),
            password: Yup.string().min(6, t('password_min_length')).required(t('password_required')),
        }),
        onSubmit: async values => {
            try {
                setLoading(true);
                const user = await handle_register(values.username, values.email, values.password);
                if (user) {
                    setLoading(false);
                    navigation.navigate('Home')
                } else {
                    console.log('Registration failed');
                }
            } catch (error) {
                setLoading(false);
                console.log('Registration error:', error);
            }finally {
                setLoading(false);
            }
        },
    });



    return (
        <Div pt={100} px={20} flex={1} bg="white">

            <Custom_input
                placeholder={t('username')}
                prefix={<AntDesign name="user" size={20} color="black" />}
                value={formik.values.name}
                onChangeText={formik.handleChange('username')}
                error={formik.errors.username}
            />

            <Custom_input
                placeholder={t('email')}
                prefix={<Fontisto name="email" size={20} color="black" />}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                error={formik.errors.email}
            />

            <Custom_input
                placeholder={t('password')}
                prefix={<AntDesign name="lock" size={20} color="black" />}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                error={formik.errors.password}
                secureTextEntry={true}

            />

            <Custom_button 
            title={loading ? t('registering') : t('register')} 
            w="100%" 
            disabled={!formik.isValid || loading}
             onPress={formik.handleSubmit} />


        </Div>
    )
}

export default Register