import Color from 'color';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AppState,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';
import NavigationService from '../../services/Navigation';
import RecognitionActions from '../../services/Recognition/actions';
import {getReceivedRecognition} from '../../services/Recognition/selectors';
import {toNow} from '../../utils/DateHelper';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
});

const NotificationCenter = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const notifications = [];
  const recognitions = useSelector(getReceivedRecognition);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatch(RecognitionActions.getReceivedRecognitions(0));
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    if (!recognitions.list) {
      dispatch(RecognitionActions.getReceivedRecognitions(0));
    }
  }, [recognitions.list, dispatch]);

  useEffect(() => {
    setRefreshing(false);
  }, [recognitions]);

  const handleLoadMore = () => {
    if (recognitions.hasNext) {
      dispatch(
        RecognitionActions.getReceivedRecognitions(recognitions.offset + 1),
      );
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(RecognitionActions.getReceivedRecognitions(0));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(NavigationService.Screens.RECOGNITION_DETAIL, {
            ...item,
            title: item?.sender?.name,
          })
        }>
        <Box
          px={16}
          height={70}
          flexDirection="row"
          backgroundColor={
            item?.unread
              ? Color.rgb(colors.BLUE).alpha(0.1).toString()
              : colors.WHITE
          }>
          <Box
            flexDirection="row"
            alignItems="center"
            mr={34}
            style={{flex: 1}}>
            <Avatar src={item?.sender?.avatar} size={52} />
            <Text ml={16} size={18} style={{flex: 1}} numberOfLines={2}>
              <Text weight={TextWeight.BOLD}>{item?.sender?.name}</Text>
              {` ${t('sent-a-recognition')}`}
            </Text>
          </Box>
          <Text size={12} mt={18}>
            {toNow(item?.created_at)}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={t('notifications')} />
      {notifications.length > 0 && (
        <Text px={15} mt={10} mb={4} size={18} weight={TextWeight.BOLD}>
          {t('recent')}
        </Text>
      )}
      <FlatList
        data={recognitions.list}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={({id}) => `notification-${id}`}
        ListEmptyComponent={() => (
          <Box alignItems="center" justifyContent="center" style={{flex: 1}}>
            <Text size={18} mb={16} weight={TextWeight.SEMIBOLD}>
              No notifications yet
            </Text>
            <Box
              width={Dimensions.get('window').width - 140}
              height={Dimensions.get('window').width - 100}>
              <LottieView source={require('./empty.json')} autoPlay loop />
            </Box>
            {/* <NotificationEmpty /> */}
            <Text
              align="center"
              color={colors.SECONDARY_TEXT}
              style={{maxWidth: 264}}>
              Stay tuned! Notifications about your activity and news will show
              up here
            </Text>
          </Box>
        )}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
  );
};

export default NotificationCenter;
