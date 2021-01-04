import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {CommonActions, StackActions} from '@react-navigation/native';

class NavigationService {
  static _navigator = null;
  static routeNameRef = React.createRef();

  static Screens = {
    BOOTING: 'Booting',
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
    AUTH: 'Auth',
    MAIN: 'Main',
    HOME: 'Home',
    REWARDS: 'Rewards',
    RECOGNITION: 'Recognition',
    MORE: 'More',
    VOUCHER_DETAIL: 'VoucherDetail',
    REWARD_DETAIL: 'RewardDetail',
    CLAIM_REWARD_SUCCESS: 'ClaimRewardSuccess',
    SUPPORT: 'Support',
    MY_ACCOUNT: 'MyAccount',
    LANGUAGE: 'Language',
    MY_VOUCHERS: 'MyVouchers',
    NOTIFICATION_CENTER: 'NotificationCenter',
    RECOGNITION_DETAIL: 'RecognitionDetail',
    REWARDS_BY_CATEGORY: 'RewardsByCategory',
    CONTACT_US: 'ContactUs',
    TERMS_AND_POLICIES: 'TermsAndPolicies',
    FORGET_PASSWORD: 'ForgetPassword',
    SET_PASSWORD: 'SetPassword',
    POST_DETAIL: 'PostDetail',
    LIKE_LIST: 'LikeList',
    COMMENT_LIST: 'CommentList',
  };

  static setTopLevelNavigator(navigatorRef) {
    NavigationService._navigator = navigatorRef;
  }

  static async onStateChange() {
    const previousRouteName = NavigationService.routeNameRef.current;
    const currentRouteName = NavigationService._navigator.getCurrentRoute()
      .name;

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    NavigationService.routeNameRef.current = currentRouteName;
  }

  static navigate(routeName, params) {
    NavigationService._navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  }

  static replace(routeName, params) {
    NavigationService._navigator.dispatch(
      StackActions.replace(routeName, params),
    );
  }

  static reset(actions, index, key) {
    NavigationService._navigator.dispatch(
      CommonActions.reset({
        actions,
        index,
        key,
      }),
    );
  }

  static goBack(key) {
    NavigationService._navigator.dispatch(
      CommonActions.back({
        key,
      }),
    );
  }

  static pop(count = 1) {
    NavigationService._navigator.dispatch(StackActions.pop(count));
  }

  static popToTop() {
    NavigationService._navigator.dispatch(StackActions.popToTop());
  }

  /*
    @param nav: navigation context from props
  */
  static getCurrentNavigation(nav) {
    const stack = [];
    const _recursiveDestruct = (navState) => {
      stack.push(navState.routeName);
      if (navState.index !== undefined) {
        return _recursiveDestruct(navState.routes[navState.index]);
      } else {
        const {routeName, params} = navState;
        return {
          routeName,
          params,
          stack,
        };
      }
    };
    return _recursiveDestruct(nav.state);
  }
}

export default NavigationService;
