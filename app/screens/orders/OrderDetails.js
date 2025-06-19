
import { useRoute } from '@react-navigation/native';
import { Div, Text, Image, ScrollDiv, Button } from 'react-native-magnus';
import Swiper from 'react-native-swiper';
import Custom_header from '../../custom/Custom_header';
import { useTranslation } from 'react-i18next';
import { colors } from '../../config/colors';
import { Dimensions } from 'react-native';

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

const { width } = Dimensions.get('window');

const OrderDetails = () => {
  const route = useRoute();
  const { order } = route.params || {};
  const { t } = useTranslation();

  // Status color mapping
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { 
          bg: '#10B981', 
          lightBg: '#ECFDF5', 
          icon: 'check-circle',
          borderColor: '#A7F3D0'
        };
      case 'pending':
        return { 
          bg: '#F59E0B', 
          lightBg: '#FFFBEB', 
          icon: 'clock',
          borderColor: '#FDE68A'
        };
      case 'processing':
        return { 
          bg: '#3B82F6', 
          lightBg: '#EFF6FF', 
          icon: 'truck',
          borderColor: '#BFDBFE'
        };
      case 'cancelled':
      case 'canceled':
        return { 
          bg: '#EF4444', 
          lightBg: '#FEF2F2', 
          icon: 'x-circle',
          borderColor: '#FECACA'
        };
      default:
        return { 
          bg: '#6B7280', 
          lightBg: '#F9FAFB', 
          icon: 'help-circle',
          borderColor: '#E5E7EB'
        };
    }
  };

  const statusStyle = getStatusStyle(order.order_status);
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';
  const orderTime = order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Calculate order total
  const orderTotal = order?.order?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Div flex={1} bg="#F1F5F9">
      <Custom_header title={t('order-details')} />

      <ScrollDiv flex={1} showsVerticalScrollIndicator={false}>
        {/* Order Header Card */}
        <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
          {/* Order ID and Status */}
          <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={20}>
            <Div>
              <Text fontSize={24} fontWeight="bold" color="#1F2937" mb={4}>
                Order #{order.id}
              </Text>
              <Div flexDir="row" alignItems="center">
                <Feather name="calendar" size={14} color="#6B7280" />
                <Text fontSize={14} color="#6B7280" ml={6}>
                  {orderDate} • {orderTime}
                </Text>
              </Div>
            </Div>
            
            <Div
              bg={statusStyle.lightBg}
              rounded="2xl"
              px={16}
              py={10}
              flexDir="row"
              alignItems="center"
              borderWidth={2}
              borderColor={statusStyle.borderColor}
            >
              <Feather name={statusStyle.icon} size={18} color={statusStyle.bg} />
              <Text
                fontSize={14}
                fontWeight="bold"
                color={statusStyle.bg}
                ml={8}
                textTransform="capitalize"
              >
                {order.order_status}
              </Text>
            </Div>
          </Div>

          {/* Order Total */}
          <Div 
            bg="rgba(34, 197, 94, 0.1)" 
            rounded="2xl" 
            p={16} 
            flexDir="row" 
            alignItems="center" 
            justifyContent="space-between"
            borderWidth={1}
            borderColor="#A7F3D0"
          >
            <Div flexDir="row" alignItems="center">
              <MaterialIcons name="receipt" size={24} color="#10B981" />
              <Text fontSize={16} fontWeight="600" color="#10B981" ml={8}>
                {t('total')} Amount
              </Text>
            </Div>
            <Text fontSize={24} fontWeight="bold" color="#10B981">
              {formatPrice(orderTotal)}
            </Text>
          </Div>
        </Div>

        {/* Customer Information Card */}
        <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
          <Div flexDir="row" alignItems="center" mb={20}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
            <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
              Customer Information
            </Text>
          </Div>

          {/* Customer Name */}
          <Div flexDir="row" alignItems="center" mb={16}>
            <Div
              bg="rgba(59, 130, 246, 0.1)"
              rounded="xl"
              w={44}
              h={44}
              alignItems="center"
              justifyContent="center"
              mr={16}
            >
              <FontAwesome5 name="user" size={18} color="#3B82F6" />
            </Div>
            <Div flex={1}>
              <Text fontSize={12} color="#6B7280" fontWeight="500" mb={2}>
                {t('customer-name')}
              </Text>
              <Text fontSize={16} fontWeight="600" color="#1F2937">
                {order.name}
              </Text>
            </Div>
          </Div>

          {/* Phone */}
          <Div flexDir="row" alignItems="center" mb={16}>
            <Div
              bg="rgba(16, 185, 129, 0.1)"
              rounded="xl"
              w={44}
              h={44}
              alignItems="center"
              justifyContent="center"
              mr={16}
            >
              <Feather name="phone" size={18} color="#10B981" />
            </Div>
            <Div flex={1}>
              <Text fontSize={12} color="#6B7280" fontWeight="500" mb={2}>
                {t('phone')}
              </Text>
              <Text fontSize={16} fontWeight="600" color="#1F2937">
                {order.phone}
              </Text>
            </Div>
          </Div>

          {/* Address */}
          <Div flexDir="row" alignItems="flex-start">
            <Div
              bg="rgba(245, 158, 11, 0.1)"
              rounded="xl"
              w={44}
              h={44}
              alignItems="center"
              justifyContent="center"
              mr={16}
            >
              <MaterialIcons name="location-on" size={18} color="#F59E0B" />
            </Div>
            <Div flex={1}>
              <Text fontSize={12} color="#6B7280" fontWeight="500" mb={2}>
                {t('address')}
              </Text>
              <Text fontSize={16} fontWeight="600" color="#1F2937" lineHeight={22}>
                {order.address}
              </Text>
            </Div>
          </Div>
        </Div>

        {/* Payment Information Card */}
        <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
          <Div flexDir="row" alignItems="center" mb={20}>
            <MaterialIcons name="payment" size={24} color={colors.primary} />
            <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
              Payment Details
            </Text>
          </Div>

          <Div flexDir="row" alignItems="center">
            <Div
              bg="rgba(139, 69, 19, 0.1)"
              rounded="xl"
              w={44}
              h={44}
              alignItems="center"
              justifyContent="center"
              mr={16}
            >
              <MaterialIcons name="credit-card" size={18} color="#8B4513" />
            </Div>
            <Div flex={1}>
              <Text fontSize={12} color="#6B7280" fontWeight="500" mb={2}>
                {t('payment-method')}
              </Text>
              <Text fontSize={16} fontWeight="600" color="#1F2937" textTransform="capitalize">
                {order.payment_method}
              </Text>
            </Div>
          </Div>
        </Div>

        {/* Order Items */}
        <Div bg="white" mx={16} mt={16} rounded="3xl" p={24} >
          <Div flexDir="row" alignItems="center" mb={20}>
            <MaterialIcons name="shopping-cart" size={24} color={colors.primary} />
            <Text fontSize={18} fontWeight="bold" color={colors.primary} ml={8}>
              {t('order-items')} ({order?.order?.length || 0})
            </Text>
          </Div>

          {order?.order?.map((item, index) => (
            <Div 
              key={index} 
              mb={index < order.order.length - 1 ? 20 : 0}
              bg="#F8FAFC"
              rounded="2xl"
              p={16}
              borderWidth={1}
              borderColor="#E5E7EB"
            >
              {/* Product Header */}
              <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={16}>
                <Div flex={1}>
                  <Text fontSize={16} fontWeight="bold" color="#1F2937" mb={4}>
                    {item.title}
                  </Text>
                  <Div flexDir="row" alignItems="center">
                    <Text fontSize={14} color="#6B7280">
                      Qty: {item.quantity}
                    </Text>
                    <Text fontSize={14} color="#6B7280" mx={8}>•</Text>
                    <Text fontSize={14} color="#6B7280">
                      {formatPrice(item.price)} each
                    </Text>
                  </Div>
                </Div>
                <Div
                  bg="rgba(34, 197, 94, 0.1)"
                  rounded="xl"
                  px={12}
                  py={6}
                  borderWidth={1}
                  borderColor="#A7F3D0"
                >
                  <Text fontSize={14} fontWeight="bold" color="#10B981">
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </Div>
              </Div>

              {/* Product Images */}
              {item.images && item.images.length > 0 && (
                <Div rounded="xl" overflow="hidden" shadow="sm">
                  <Swiper
                    height={200}
                    nextButton={
                      <Div
                        bg="rgba(0,0,0,0.5)"
                        rounded="full"
                        w={36}
                        h={36}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <AntDesign name="right" size={16} color="white" />
                      </Div>
                    }
                    prevButton={
                      <Div
                        bg="rgba(0,0,0,0.5)"
                        rounded="full"
                        w={36}
                        h={36}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <AntDesign name="left" size={16} color="white" />
                      </Div>
                    }
                    dot={
                      <Div 
                        bg="rgba(255,255,255,0.5)" 
                        h={8} 
                        w={8} 
                        mx={4} 
                        rounded="circle" 
                      />
                    }
                    activeDot={
                      <Div 
                        bg="white" 
                        h={8} 
                        w={20} 
                        mx={4} 
                        rounded="full" 
                      />
                    }
                    autoplay={true}
                    autoplayTimeout={4}
                    loop={item.images.length > 1}
                  >
                    {item.images.map((img, idx) => (
                      <Image
                        key={img.id || idx}
                        h={200}
                        w="100%"
                        resizeMode="cover"
                        source={{
                          uri: img.formats?.thumbnail?.url || img.url || 'https://via.placeholder.com/300x200?text=Product+Image',
                        }}
                      />
                    ))}
                  </Swiper>
                </Div>
              )}

              {/* No Image Placeholder */}
              {(!item.images || item.images.length === 0) && (
                <Div
                  bg="#E5E7EB"
                  h={200}
                  rounded="xl"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MaterialIcons name="image" size={48} color="#9CA3AF" />
                  <Text fontSize={14} color="#9CA3AF" mt={8}>
                    No Image Available
                  </Text>
                </Div>
              )}
            </Div>
          ))}
        </Div>

        {/* Action Buttons */}
        <Div mx={16} mt={16} mb={32}>
          <Div flexDir="row" justifyContent="space-between">
            <Button
              bg={colors.secondary}
              rounded="2xl"
              px={24}
              py={16}
              flex={0.48}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              shadow="md"
            >
              <MaterialIcons name="print" size={20} color="white" />
              <Text color="white" fontSize={16} fontWeight="600" ml={8}>
                Print
              </Text>
            </Button>

            <Button
              bg={colors.primary}
              rounded="2xl"
              px={24}
              py={16}
              flex={0.48}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              shadow="md"
            >
              <MaterialIcons name="share" size={20} color="white" />
              <Text color="white" fontSize={16} fontWeight="600" ml={8}>
                Share
              </Text>
            </Button>
          </Div>
        </Div>
      </ScrollDiv>
    </Div>
  );
};

export default OrderDetails;