import { useRef } from "react"
import { Div, Input, Button, Text, Icon, Image } from "react-native-magnus"
import { colors } from "../../config/colors"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { AuthContext } from "../../context/AuthProvider"
import Custom_input from "../../custom/Custom_input"
import Custom_button from "../../custom/Custom_button"
import { Toast } from "toastify-react-native"


const Login = () => {
  const { auth, handle_login, handle_register, handle_logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigation = useNavigation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      identifier: 'vendor@gmail.com',
      password: '123456789'
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string().email(t('invalid_email')).required(t('email_required')),
      password: Yup.string().min(6, t('password_min_length')).required(t('password_required')),
    }),
    onSubmit: async values => {
      setLoading(true)
      try {
        const result = await handle_login(values.identifier, values.password)

        if (result) {

          Toast.show({
            type: 'success',
            text1: t('login_successful'),
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,

          })
          setTimeout(() => {
            navigation.navigate('Home')
          }, 3000);
        }
        setLoading(false)
      } catch (error) {
        console.log("Error Login fdfdsf", error)
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: t('login_failed'),
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,

        })

      } finally {
        setLoading(false)
      }

    }
  })



  return (
    <Div flex={1} flexDir="column" alignItems="center" px={10} bg="white">

      <Div w="100%" pt={100}>
        <Image w="100%" h={200} mb={50} source={require('../../../assets/images/login.jpg')} />
        <Custom_input value={formik.values.identifier} placeholder="Email" onChangeText={formik.handleChange('identifier')} error={formik.errors.identifier} />
        <Custom_input value={formik.values.password} placeholder="Password" onChangeText={formik.handleChange('password')} secureTextEntry error={formik.errors.password} />
        <Custom_button title={t('login')} onPress={formik.handleSubmit} disabled={loading} />
        <Div mt={20} flexDir="row" justifyContent="center" alignItems="center">

          <Text textAlign="center" color={colors.primary} >
            {t('dont-have-an-account')}
          </Text>
          <Button bg={colors.secondary} px={10} py={5} mx={5} onPress={() => navigation.navigate('Register')}>{t('register')}</Button>
        </Div>
      </Div>
    </Div>
  )
}

export default Login