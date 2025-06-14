
import { NavigationContainer } from '@react-navigation/native';
import DataProvider from './app/context/DataProvide';
import AppNavigator from './app/AppNavigator';
import AuthProvider from './app/context/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/translation/i18n';
import Toast from 'toastify-react-native';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <DataProvider>
          <I18nextProvider i18n={i18n}>
            <AppNavigator />

          </I18nextProvider>

        </DataProvider>
      </AuthProvider>
      <Toast />
    </NavigationContainer>
  );
}


