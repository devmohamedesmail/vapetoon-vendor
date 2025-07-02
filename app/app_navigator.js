import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home/home';
import AddProduct from './screens/products/add';
import Show from './screens/products/show';
import Register from './screens/auth/register';
import Login from './screens/auth/login';
import CreateVendor from './screens/createvendor/create_vendor';
import Orders from './screens/orders/orders';
import OrderDetails from './screens/orders/order_details';
import UpdateVendor from './screens/createvendor/update_vendor';

import UpdateProduct from './screens/products/update_product';
import Help from './screens/help/help';
import Settings from './screens/settings/settings';
import Details from './screens/products/details';


const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
     <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Show" component={Show} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="CreateVendor" component={CreateVendor} />
        <Stack.Screen name="UpdateVendor" component={UpdateVendor} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Settings" component={Settings} />




      </Stack.Navigator>
  )
}

export default AppNavigator