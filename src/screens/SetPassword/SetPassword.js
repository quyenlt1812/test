import Input from 'components/Input';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Dimensions,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import SignInBg from '../../assets/images/auth-bg.png';
import Logo from '../../assets/images/logo.svg';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Text from '../../components/Text';
import colors from '../../constants/colors';
import {getSignInStatus} from '../../services/Auth/selectors';
import UsersActions from '../../services/Users/actions';
import styles from './styles';

const SetPassword = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const signInStatus = useSelector(getSignInStatus);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (
      signInStatus.statusCode !== 200 ||
      (signInStatus.data && !Object.keys(signInStatus.data).length)
    ) {
      Alert.alert('Sign in failed', signInStatus.message);
    }
  }, [signInStatus]);

  const handleChangePassword = (value) => {
    if (value.length < 6) {
      setPasswordError(t('errors.auth003'));
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };

  const handleChangeConfirmPassword = (value) => {
    if (value.length < 6) {
      setConfirmPasswordError(t('errors.auth003'));
    } else {
      if (value !== password) {
        setConfirmPasswordError(t('errors.auth004'));
      } else {
        setConfirmPasswordError('');
      }
    }
    setConfirmPassword(value);
  };

  const handleSetPassword = () => {
    dispatch(
      UsersActions.changePassword({newPassword: password, isEdit: false}),
    );
  };

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
        <Box px={32}>
          <Box mt={80} mb={18} alignItems="center">
            <Logo />
          </Box>
          <Text
            size={20}
            mb={80}
            lineHeight={24}
            color={colors.SECONDARY_TEXT}
            align="center">
            Please set your own password
          </Text>
          <Input
            secureTextEntry
            icon="lock"
            placeholder={t('password')}
            value={password}
            onChangeText={handleChangePassword}
            error={passwordError}
          />
          <Input
            secureTextEntry
            icon="lock"
            placeholder={t('confirm-password')}
            value={confirmPassword}
            onChangeText={handleChangeConfirmPassword}
            error={confirmPasswordError}
          />
          <Box mt={50} mb={8}>
            <Button
              height={54}
              fontSize={18}
              disabled={
                !password ||
                !confirmPassword ||
                !!passwordError ||
                !!confirmPasswordError
              }
              onPress={handleSetPassword}>
              {t('set-password')}
            </Button>
          </Box>
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SetPassword;
