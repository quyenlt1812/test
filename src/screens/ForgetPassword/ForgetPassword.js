import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Box from '../../components/Box';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import {useTranslation} from 'react-i18next';
import Text, {TextWeight} from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import AuthRepo from '../../services/Auth/repo';
import {useDispatch} from 'react-redux';
import AppActions from '../../services/App/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: StatusBar.currentHeight || 0,
  },
  emailSent: {
    height: 42,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ForgetPassword = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (value) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
    if (!isEmailValid) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
    setEmail(value);
  };

  const handleForgetPassword = useCallback(async () => {
    if (email && !emailError) {
      try {
        setLoading(true);
        const result = await AuthRepo.resetPasswordRepo(email.toLowerCase());
        if (result?.message === 'Reset password success') {
          setSuccess(true);
          setLoading(false);
        } else {
          dispatch(
            AppActions.openAlertModal({
              title: t('request-failed'),
              message: result?.message,
            }),
          );
          setLoading(false);
        }
      } catch (error) {
        dispatch(
          AppActions.openAlertModal({
            title: t('request-failed'),
            message: error.message,
          }),
        );
        setLoading(false);
      }
    }
  }, [email, emailError, dispatch, t]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Box>
          <Header
            backable
            title={t('lost-password')}
            titleStyle={{color: colors.PRIMARY, size: 24}}
          />
        </Box>
        <Box width="100%" px={32} flex={1}>
          <Box
            alignItems="center"
            width={194}
            height={194}
            style={{alignSelf: 'center'}}>
            <LottieView
              source={require('./forget-password.json')}
              autoPlay
              loop
            />
          </Box>
          <Text size={18} color={colors.SECONDARY_TEXT} mb={30}>
            {t('forget-password-message')}
          </Text>
          <Box mb={55}>
            <Input
              disabled={success}
              icon="mail"
              placeholder={t('email')}
              keyboardType="email-address"
              value={email}
              onChangeText={handleChangeEmail}
              error={emailError}
              returnKeyType="done"
              onSubmitEditing={handleForgetPassword}
            />
          </Box>
          <Box height={54} alignItems="center" justifyContent="center">
            {success ? (
              <LinearGradient
                colors={['rgba(10, 196, 186, 0.9)', 'rgba(43, 218, 142, 0.9)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.emailSent}>
                <Text weight={TextWeight.BOLD} color={colors.WHITE}>
                  {t('forget-password-sent')}
                </Text>
              </LinearGradient>
            ) : (
              <Button
                loading={loading}
                style={{width: '100%'}}
                disabled={!email || !!emailError}
                height={54}
                fontSize={18}
                onPress={handleForgetPassword}>
                {t('send')}
              </Button>
            )}
          </Box>
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword;
