import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home/Home';
import AddProduct from './screens/products/Add';
import Show from './screens/products/Show';
import Register from './screens/Auth/Register';
import Login from './screens/Auth/Login';
import CreateVendor from './screens/CreateVendor/CreateVendor';
import Orders from './screens/orders/Orders';
import OrderDetails from './screens/orders/OrderDetails';
import UpdateVendor from './screens/CreateVendor/UpdateVendor';
import Details from './screens/products/Details';

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




      </Stack.Navigator>
  )
}

export default AppNavigator