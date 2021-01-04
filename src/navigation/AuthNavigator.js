import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ForgetPassword, SignIn, SignUp} from '../screens';

const Auth = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Auth.Navigator headerMode="none">
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="ForgetPassword" component={ForgetPassword} />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
