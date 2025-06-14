
import { useRoute } from '@react-navigation/native';
import { Div, Text, Image, ScrollDiv } from 'react-native-magnus';
import Swiper from 'react-native-swiper';
import Custom_header from '../../custom/Custom_header';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
const OrderDetails = () => {
  const route = useRoute();
  const { order } = route.params || {};
  const { t } = useTranslation();



  return (
    <Div flex={1} bg="white" >
      <Custom_header title={t('order-details')} />


      <ScrollDiv>
        <Div mb={10} px={5} py={10}>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('customer-name')} : {order.name}</Text>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('address')} : {order.address}</Text>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('phone')} : {order.phone}</Text>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('order-status')} :  {order.order_status}</Text>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('payment-method')} :  {order.payment_method}</Text>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('order-date')} : {order.createdAt?.slice(0, 10)}</Text>
        </Div>

        <Div mb={10} px={5} py={10}>
          <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('order-items')}</Text>

          {order?.order.map((item, index) => (
            <Div key={index}  rounded={20} flexDir='column' justifyContent='space-between' alignItems='center' py={10} borderWidth={1} borderColor='gray500'>

              <Div>
                <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('product-name')} : {item.title}</Text>
                <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('quantity')} :{item.quantity}</Text>
                <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('product-price')} :{item.price}</Text>
                <Text fontWeight="bold" borderBottomWidth={1} borderBottomColor='gray200' py={10}>{t('total')} : {item.price * item.quantity}</Text>
              </Div>
              <Swiper 
                height={200}
                nextButton={<Entypo name="arrow-with-circle-right" size={24} color="red" />}
                prevButton={<Entypo name="arrow-with-circle-left" size={24} color="red" />}
                dot={<Div bg="gray300" h={8} w={8} mx={5} rounded="circle" />}
                activeDot={<Div bg="red600" h={8} w={8} rounded="circle" />}
                autoplay={true}
                autoplayTimeout={3}
                loop={true}
                
                >
                {item.images && item.images.length > 0 ? (
                  item.images.map((img, idx) => (
                    <Image
                      key={img.id || idx}
                      h={200}
                      w="100%"
                      resizeMode="cover"
                      source={{
                        uri: img.formats?.thumbnail?.url || img.url || 'https://via.placeholder.com/150',
                      }}
                    />
                  ))
                ) : (
                  <Image
                    h={150}
                    w="100%"
                    resizeMode="cover"
                    source={{ uri: 'https://via.placeholder.com/150' }}
                  />
                )}
              </Swiper>
            </Div>
          ))}






        </Div>





      </ScrollDiv>
    </Div>
  )
}

export default OrderDetails