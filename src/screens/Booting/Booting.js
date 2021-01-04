import React, {useEffect} from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import AppActions from 'services/App/actions';
import Box from 'components/Box';
import Text from 'components/Text';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
});

const Booting = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    console.log('RELOAD APP');
    dispatch(AppActions.getAppData());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <Box width={Dimensions.get('window').width} height={500}>
        <LottieView source={require('./cat.json')} autoPlay loop />
      </Box>
      <Text>{t('loading-data')}</Text>
    </SafeAreaView>
  );
};

export default Booting;
