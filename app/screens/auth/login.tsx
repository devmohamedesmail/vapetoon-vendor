import { useRef } from "react"
import { Div, Input, Button, Text, Icon, Image } from "react-native-magnus"
import { colors } from "../../config/colors"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { AuthContext } from "../../context/AuthProvider"
import Custom_Input from "../../custom/custom_input"
import Custom_Button from "../../custom/custom_button"
import { Toast } from "toastify-react-native"
import { Platform } from "react-native"

const Login = () => {
  const { auth, handle_login, handle_register, handle_logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<any>();
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

  // Dummy handlers for social login
  const handleGoogleLogin = () => {
    Toast.show({ type: 'info', text1: 'Google login pressed' })
  }
  const handleAppleLogin = () => {
    Toast.show({ type: 'info', text1: 'Apple login pressed' })
  }


  return (
    <Div flex={1} bg="white" justifyContent="center" alignItems="center" px={0}>
      <Div w="100%" maxW={400} bg="white" rounded="3xl" p={28} alignItems="center" mx={0}>
        <Image
          source={require('../../../assets/images/login.jpg')}
          w={100}
          h={100}
          mb={20}
          rounded="circle"
          style={{ borderWidth: 3, borderColor: "#E0EAFC" }}
        />
        <Text fontWeight="bold" fontSize={30} color={colors.primary} mb={6} letterSpacing={1.2}>
          {t("login")}
        </Text>
        <Text color="gray600" fontSize={15} mb={18} textAlign="center">
          {t("login_to_continue")}
        </Text>
        <Custom_Input
          value={formik.values.identifier}
          placeholder={t("email")}
          onChangeText={formik.handleChange("identifier")}
          error={formik.touched.identifier && formik.errors.identifier}
          mb={10}
          w="100%"
          icon={<Icon name="mail" fontFamily="Feather" fontSize={20} color={colors.secondary} />}
        />
        <Custom_Input
          value={formik.values.password}
          placeholder={t("password")}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
          error={formik.touched.password && formik.errors.password}
          mb={16}
          w="100%"
          icon={<Icon name="lock" fontFamily="Feather" fontSize={20} color={colors.secondary} />}
        />
        <Custom_Button
          title={loading ? t("loading") : t("login")}
          onPress={formik.handleSubmit}
          disabled={loading}
          block
          bg={colors.primary}
          mb={18}
          w="100%"
          rounded="xl"
          fontSize={18}
          style={{ elevation: 0 }}
        />
        <Text color="gray700" mb={12} fontSize={15}>{t("or_login_with")}</Text>
        <Div flexDir="row" mb={16}>
          <Button
            bg="#F3F4F6"
            borderWidth={0}
            rounded="circle"
            mr={14}
            onPress={() => Toast.show({ type: "info", text1: "Google login" })}
            px={20}
            py={13}
          >
            <Image source={require('../../../assets/images/google.png')} w={24} h={24} />
          </Button>
          {Platform.OS === "ios" && (
            <Button
              bg="#F3F4F6"
              borderWidth={0}
              rounded="circle"
              onPress={() => Toast.show({ type: "info", text1: "Apple login" })}
              px={20}
              py={13}
            >
              <Icon name="apple" fontFamily="FontAwesome" fontSize={24} color="black" />
            </Button>
          )}
        </Div>
        <Div flexDir="row" alignItems="center" mt={10}>
          <Text color="gray700" fontSize={15}>{t("dont-have-an-account")}</Text>
          <Button
            bg="transparent"
            px={16}
            py={7}
            ml={10}
            rounded="circle"
            onPress={() => navigation.navigate("Register")}
          >
            <Text color="black" textDecorLine="underline" fontSize={12}>{t("register")}</Text>
          </Button>
        </Div>
      </Div>
    </Div>
  )
}

export default Login