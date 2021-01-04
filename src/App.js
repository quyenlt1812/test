import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import store from './store';
import NavigationService from './services/Navigation';
import AlertModal from './components/Modals/AlertModal';
import Confirmation from './components/Modals/Confirmation';
import './translation/index';
import {StatusBar} from 'react-native';
import colors from './constants/colors';

export default function App() {
  return (
    <NavigationContainer
      ref={(r) => NavigationService.setTopLevelNavigator(r)}
      onStateChange={NavigationService.onStateChange}>
      <Provider store={store}>
        <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
        <AppNavigator />
        <AlertModal />
        <Confirmation />
      </Provider>
    </NavigationContainer>
  );
}
