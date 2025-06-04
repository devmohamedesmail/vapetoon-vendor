
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/login/Login';
import Home from './app/screens/Home/Home';
import Show from './app/screens/products/Show';
import AddProduct from './app/screens/products/Add';
import DataProvider from './app/context/DataProvide';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <DataProvider>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Show" component={Show} />
        <Stack.Screen name="AddProduct" component={AddProduct} />



      </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}


