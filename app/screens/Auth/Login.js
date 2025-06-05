import { useRef } from "react"
import { Div, Input, Button, Text, Icon } from "react-native-magnus"
import { colors } from "../../config/colors"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { AuthContext } from "../../context/AuthProvider"
import Custom_input from "../../custom/Custom_input"
import Custom_button from "../../custom/Custom_button"


const Login = () => {
  const { auth, handle_login, handle_register , handle_logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const snackbarRef = useRef(null);
  const [error, setError] = useState(null)
  const navigation = useNavigation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      identifier: 'user@gmail.com',
      password: '123456789'
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async values => {
      setLoading(true)
      try {
        const result = await handle_login(values.identifier, values.password)
        
        if (result) {
          navigation.navigate('Home')
        }






        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }

    }
  })



  return (
    <Div flex={1} flexDir="column" justifyContent="center" alignItems="center" px={10}>

      <Div w="100%">
        <Custom_input value={formik.values.identifier} placeholder="Email" onChangeText={formik.handleChange('identifier')} error={formik.errors.identifier} />
        <Custom_input value={formik.values.password} placeholder="Password" onChangeText={formik.handleChange('password')} secureTextEntry error={formik.errors.password} />
        <Custom_button title={t('login')} onPress={formik.handleSubmit} disabled={loading} />
      </Div>
    </Div>
  )
}

export default Login