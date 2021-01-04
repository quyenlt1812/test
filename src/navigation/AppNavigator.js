import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {useTranslation} from 'react-i18next';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import Storage from '../services/Storage';
import {
  Booting,
  ClaimRewardSuccess,
  CommentList,
  ContactUs,
  Language,
  LikeList,
  MyAccount,
  MyVouchers,
  NotificationCenter,
  PostDetail,
  RecognitionDetail,
  RewardDetail,
  RewardsByCategory,
  SetPassword,
  Support,
  TermsAndPolicies,
  VoucherDetail,
} from '../screens';

const App = createStackNavigator();

const AppNavigator = () => {
  const {i18n} = useTranslation();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const setLanguage = async () => {
      const language = await Storage.getLanguage();
      i18n.changeLanguage(language);
    };
    setLanguage();
  }, []);

  return (
    <App.Navigator headerMode="none">
      <App.Screen name="Booting" component={Booting} />
      {/* <App.Screen name="SignIn" component={SignIn} /> */}
      <App.Screen name="Auth" component={AuthNavigator} />
      <App.Screen name="Main" component={BottomTabNavigator} />
      <App.Screen name="VoucherDetail" component={VoucherDetail} />
      <App.Screen name="RewardDetail" component={RewardDetail} />
      <App.Screen name="ClaimRewardSuccess" component={ClaimRewardSuccess} />
      <App.Screen name="Support" component={Support} />
      <App.Screen name="ContactUs" component={ContactUs} />
      <App.Screen name="TermsAndPolicies" component={TermsAndPolicies} />
      <App.Screen name="MyAccount" component={MyAccount} />
      <App.Screen name="Language" component={Language} />
      <App.Screen name="MyVouchers" component={MyVouchers} />
      <App.Screen name="NotificationCenter" component={NotificationCenter} />
      <App.Screen name="RecognitionDetail" component={RecognitionDetail} />
      <App.Screen name="RewardsByCategory" component={RewardsByCategory} />
      <App.Screen name="SetPassword" component={SetPassword} />
      <App.Screen name="PostDetail" component={PostDetail} />
      <App.Screen name="LikeList" component={LikeList} />
      <App.Screen name="CommentList" component={CommentList} />
    </App.Navigator>
  );
};

export default AppNavigator;
