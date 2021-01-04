import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import SignInBg from '../../assets/images/auth-bg.png';
import Logo from '../../assets/images/logo.svg';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Input from '../../components/Input';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import AuthActions from '../../services/Auth/actions';
import {isSigningIn} from '../../services/Auth/selectors';
import NavigationService from '../../services/Navigation';
import styles from './styles';

const SignIn = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(isSigningIn);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const _passwordRef = useRef();

  const handleChangeEmail = (value) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/g.test(value);
    if (!isEmailValid) {
      setEmailError(t('errors.auth001'));
    } else {
      setEmailError('');
    }
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    if (value.length < 6) {
      setPasswordError(t('errors.auth003'));
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };

  const onDonePressing = useCallback(() => {
    if (!!email && !!password && !emailError && !passwordError) {
      handleSignIn();
    }
  }, [email, password, emailError, passwordError, handleSignIn]);

  const handleSignIn = useCallback(() => {
    Keyboard.dismiss();
    dispatch(AuthActions.signIn({email, password}));
  }, [dispatch, email, password]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image
          src={SignInBg}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width / 0.87}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.imageBg}
        />
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <Box px={32} flex={1} pb={100}>
            <Box mt={64} mb={18} alignItems="center">
              <Logo />
            </Box>
            <Text
              size={20}
              mb={70}
              lineHeight={24}
              color={colors.SECONDARY_TEXT}
              align="center">
              {t('welcome')}
            </Text>
            <Box mb={60}>
              <Input
                blurOnSubmit={false}
                icon="mail"
                placeholder={t('email')}
                keyboardType="email-address"
                value={email}
                onChangeText={handleChangeEmail}
                error={emailError}
                returnKeyType="next"
                onSubmitEditing={() => _passwordRef?.current?.focus()}
              />
              <Input
                blurOnSubmit
                ref={_passwordRef}
                secureTextEntry
                icon="lock"
                placeholder={t('password')}
                value={password}
                onChangeText={handleChangePassword}
                error={passwordError}
                returnKeyType="done"
                onSubmitEditing={onDonePressing}
              />
            </Box>
            <Box>
              <Box mb={8}>
                <Button
                  loading={loading}
                  height={54}
                  fontSize={18}
                  disabled={
                    !email || !password || !!emailError || !!passwordError
                  }
                  onPress={handleSignIn}>
                  {t('sign-in')}
                </Button>
              </Box>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate(NavigationService.Screens.FORGET_PASSWORD)
                }>
                <Text
                  weight={TextWeight.SEMIBOLD}
                  align="center"
                  color={colors.PRIMARY}
                  style={styles.forgotPassword}>
                  {t('forget-password')}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
