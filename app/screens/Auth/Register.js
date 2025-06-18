import Custom_input from "../../custom/Custom_input"
import { Div ,Text,Button, Image} from "react-native-magnus"
import Custom_button from "../../custom/Custom_button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useTranslation } from "react-i18next"
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../../config/colors"

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
            } finally {
                setLoading(false);
            }
        },
    });



    return (
     <Div flex={1} bg={{ linearGradient: "90deg, #F7F8FA 60%, #E0EAFC 100%" }} justifyContent="center" alignItems="center" px={0}>
      <Div w="100%" maxW={400} bg="white" rounded="3xl" p={28} alignItems="center" mx={0}>
        <Image
          source={require('../../../assets/images/register.jpg')}
          w={100}
          h={100}
          mb={20}
          rounded="circle"
          style={{ borderWidth: 3, borderColor: "#E0EAFC" }}
        />
        <Text fontWeight="bold" fontSize={30} color={colors.primary} mb={6} letterSpacing={1.2}>
          {t("register")}
        </Text>
        <Text color="gray600" fontSize={15} mb={18} textAlign="center">
          {t("register_to_continue")}
        </Text>
        <Custom_input
          value={formik.values.username}
          placeholder={t('username')}
          onChangeText={formik.handleChange('username')}
          error={formik.touched.username && formik.errors.username}
          mb={10}
          w="100%"
          icon={<AntDesign name="user" size={20} color={colors.secondary} />}
        />
        <Custom_input
          value={formik.values.email}
          placeholder={t('email')}
          onChangeText={formik.handleChange('email')}
          error={formik.touched.email && formik.errors.email}
          mb={10}
          w="100%"
          icon={<Fontisto name="email" size={20} color={colors.secondary} />}
        />
        <Custom_input
          value={formik.values.password}
          placeholder={t('password')}
          onChangeText={formik.handleChange('password')}
          error={formik.touched.password && formik.errors.password}
          secureTextEntry
          mb={16}
          w="100%"
          icon={<AntDesign name="lock" size={20} color={colors.secondary} />}
        />
        <Custom_button
          title={loading ? t('registering') : t('register')}
          w="100%"
          disabled={!formik.isValid || loading}
          onPress={formik.handleSubmit}
          block
          bg={colors.primary}
          mb={18}
          rounded="xl"
          fontSize={18}
          style={{ elevation: 0 }}
        />
        <Div flexDir="row" mt={10}>
          <Text color="gray700" fontSize={15}>{t("already-have-an-account")}</Text>
          <Button
            bg={colors.secondary}
            px={16}
            py={7}
            ml={10}
            rounded="circle"
            onPress={() => navigation.navigate("Login")}
          >
            <Text color="white" fontWeight="bold" fontSize={15}>{t("login")}</Text>
          </Button>
        </Div>
      </Div>
    </Div>
    )
}

export default Register